export const formatResponse = (response) => {
  return response?.data || response
}

const currencyByLocale = {
  'en-GB': 'GBP',
  'en-US': 'USD',
  'en-ZA': 'ZAR',
  'en-AU': 'AUD',
  'en-CA': 'CAD',
  en: 'USD',
  default: 'USD'
}

const regionalPricingByLocale = {
  'en-GB': { taxRate: 0.20, shipping: 4.99 },
  'en-US': { taxRate: 0.07, shipping: 5.99 },
  'en-ZA': { taxRate: 0.15, shipping: 3.99 },
  'en-AU': { taxRate: 0.10, shipping: 6.99 },
  en: { taxRate: 0.07, shipping: 5.99 },
  default: { taxRate: 0, shipping: 5 }
}

const currencyOverrideKey = 'wros.currency'
const supportedCurrencies = new Set(Object.values(currencyByLocale))

const toAmount = (value) => Math.max(Number(value) || 0, 0)

const normalizeLocale = (locale) => {
  try {
    return Intl.getCanonicalLocales(locale)[0] || 'en-US'
  } catch {
    return 'en-US'
  }
}

const getLocaleKey = (locale = getCurrencyLocale()) => {
  try {
    const parsedLocale = new Intl.Locale(locale)
    return parsedLocale.region ? `${parsedLocale.language}-${parsedLocale.region}` : parsedLocale.language
  } catch {
    return 'en-US'
  }
}

export const getCurrencyLocale = () => {
  return normalizeLocale(typeof navigator === 'undefined' ? 'en-US' : navigator.language || 'en-US')
}

export const getCurrencyOverride = () => {
  const currency = typeof localStorage === 'undefined' ? '' : localStorage.getItem(currencyOverrideKey) || ''
  return supportedCurrencies.has(currency) ? currency : ''
}

export const setCurrencyOverride = (currency) => {
  if (typeof localStorage === 'undefined') return
  if (supportedCurrencies.has(currency)) {
    localStorage.setItem(currencyOverrideKey, currency)
  } else {
    localStorage.removeItem(currencyOverrideKey)
  }
}

export const getRegionalPricing = () => {
  return regionalPricingByLocale[getLocaleKey()] || regionalPricingByLocale.default
}

export const calculateRegionalEstimate = (subtotal, orderCount = 1, discount = 0) => {
  const { taxRate, shipping } = getRegionalPricing()
  const value = toAmount(subtotal)
  const discountTotal = Math.min(toAmount(discount), value)
  const taxableSubtotal = value - discountTotal
  const tax = taxableSubtotal * taxRate
  const shippingTotal = toAmount(orderCount) * shipping

  return { subtotal: value, discount: discountTotal, taxableSubtotal, taxRate, tax, shipping: shippingTotal, total: taxableSubtotal + tax + shippingTotal }
}

export const formatPrice = (price) => {
  const locale = getCurrencyLocale()
  const currency = getCurrencyOverride() || currencyByLocale[getLocaleKey(locale)] || currencyByLocale.default

  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(toAmount(price))
}

export const formatDiscount = (discount) => formatPrice(toAmount(discount))
export const formatAnalyticsPrice = (value) => formatPrice(value)
export const formatAIPrice = (value) => formatPrice(value)
