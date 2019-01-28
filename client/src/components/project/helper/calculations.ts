import { Currency } from '../../../libs/currency'

interface Items {
  price?: string | null
  quantity?: number | null
}
interface ItemsWithTax extends Items {
  taxRate?: number | null
}

interface Options {
  format?: boolean
}

const defaultOptions: Options = {
  format: true
}

const getSubtotal = (items: Items[], { format }: Options = defaultOptions) => {
  const total = items.reduce((sum, item) => {
    if (!item.price || !item.quantity) return sum
    return (sum += +item.price * item.quantity)
  }, 0)
  return format ? Currency.format(total) : String(total)
}

const getTaxTotal = (
  items: ItemsWithTax[],
  { format }: Options = defaultOptions
) => {
  const total = items.reduce((sum, item) => {
    if (!item.price || !item.quantity || !item.taxRate) return sum
    return (sum += (+item.price * item.quantity * item.taxRate) / 100)
  }, 0)
  return format ? Currency.format(total) : String(total)
}

const getGrandTotal = (
  items: ItemsWithTax[],
  { format }: Options = defaultOptions
) => {
  const total = items.reduce((sum, item) => {
    if (!item.price || !item.quantity || !item.taxRate) return sum
    return (sum += +item.price * item.quantity * (1 + item.taxRate / 100))
  }, 0)
  return format ? Currency.format(total) : String(total)
}

export const Calculations = {
  getSubtotal,
  getTaxTotal,
  getGrandTotal
}
