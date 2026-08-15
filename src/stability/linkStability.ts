export type StabilityLog = { type: string; message: string; path?: string; timestamp: string }

const LOG_KEY = 'wros_lsl_logs'
const CONSOLE_PREFIX = '/console'
const FOUNDER_PREFIX = '/founder'

export const getViteBasePath = () => {
  const base = import.meta.env.BASE_URL || '/'
  return `/${base.replace(/^\/+|\/+$/g, '')}`
}

export const getRouterBasename = () => ''

export const writeStabilityLog = (type: string, message: string, path?: string) => {
  const entry = { type, message, path, timestamp: new Date().toISOString() }
  try {
    const existing = JSON.parse(localStorage.getItem(LOG_KEY) || '[]') as StabilityLog[]
    const previous = existing[existing.length - 1]
    if (previous && previous.type === entry.type && previous.message === entry.message && previous.path === entry.path && Date.parse(entry.timestamp) - Date.parse(previous.timestamp) < 1000) return previous
    localStorage.setItem(LOG_KEY, JSON.stringify([...existing.slice(-99), entry]))
  } catch {
    // Storage is optional; navigation must continue if it is unavailable.
  }
  return entry
}

export const getStabilityLogs = (): StabilityLog[] => {
  try { return JSON.parse(localStorage.getItem(LOG_KEY) || '[]') as StabilityLog[] } catch { return [] }
}

export const validateBasePaths = () => {
  const viteBase = getViteBasePath()
  const routerBase = getRouterBasename()
  if (routerBase && routerBase !== viteBase) writeStabilityLog('base-mismatch', `Router basename ${routerBase} differs from Vite base ${viteBase}`)
  return { routerBase, viteBase, valid: !routerBase || routerBase === viteBase }
}

const ensureSlash = (path: string) => path.startsWith('/') ? path : `/${path}`

export const normalizePath = (target: string, currentPath = '') => {
  const raw = String(target || '').trim()
  if (!raw) return currentPath.startsWith(FOUNDER_PREFIX) ? FOUNDER_PREFIX : CONSOLE_PREFIX
  if (/^(https?:|mailto:|tel:|#)/i.test(raw)) return raw

  const path = ensureSlash(raw).replace(/\/+/g, '/')
  if (raw.startsWith('/')) return path

  const prefix = currentPath.startsWith(FOUNDER_PREFIX) ? FOUNDER_PREFIX : CONSOLE_PREFIX
  writeStabilityLog('path-normalized', `Added ${prefix} to a route without a stable prefix`, path)
  return `${prefix}${path === '/' ? '' : path}` || prefix
}

export const isStablePath = (path: string) => path.startsWith('/')

export const stabilizeInitialRoute = (path: string) => {
  validateBasePaths()
  if (path === '/' || isStablePath(path)) return path
  const normalized = normalizePath(path)
  writeStabilityLog('route-repaired', 'Initial route was normalized during hydration', path)
  return normalized
}