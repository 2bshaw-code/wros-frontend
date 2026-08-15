import fs from 'node:fs'
import path from 'node:path'

const routes = [
  'home', 'about', 'pricing', 'contact', 'support',
  'auth/login', 'auth/signup',
  'console',
  'console/merchant', 'console/merchant/orders', 'console/merchant/catalog', 'console/merchant/products', 'console/merchant/products/add', 'console/merchant/invoices/add', 'console/merchant/categories/add', 'console/merchant/inventory', 'console/merchant/inventory/add', 'console/merchant/customers', 'console/merchant/customers/add', 'console/merchant/messages', 'console/merchant/automation', 'console/merchant/docs', 'console/merchant/legal', 'console/merchant/settings',
  'console/owner', 'console/owner/onboarding', 'console/owner/analytics', 'console/owner/automation', 'console/owner/settings',
  'founder', 'founder/overview', 'founder/health', 'founder/deployments', 'founder/system', 'founder/system/actions', 'founder/config', 'founder/logs', 'founder/bob', 'founder/bob/media', 'founder/media', 'founder/sales', 'founder/marketing', 'founder/commercial', 'founder/quantum', 'founder/quantum/forecasting', 'founder/quantum/optimisation', 'founder/quantum/anomalies', 'founder/quantum/security', 'founder/bob/quantum',
]

const dist = path.resolve('dist')
const source = path.join(dist, 'index.html')
if (!fs.existsSync(source)) throw new Error('dist/index.html is required before generating route fallbacks')

for (const route of routes) {
  const directory = path.join(dist, route)
  fs.mkdirSync(directory, { recursive: true })
  fs.copyFileSync(source, path.join(directory, 'index.html'))
}

console.log(`Generated ${routes.length} static route fallbacks`)
