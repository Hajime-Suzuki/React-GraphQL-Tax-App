import { Currency } from '../../../libs/currency'

type Price = string | null
type Quantity = number | null
type TaxRate = number | null
interface Options {
  format: boolean
}

const defaultOptions: Options = {
  format: true
}

const getSubtotal = (
  items: { price?: Price; quantity?: Quantity }[],
  options: Options = defaultOptions
) => {
  const total = items.reduce((sum, item) => {
    if (!item.price || !item.quantity) return sum
    return (sum += +item.price * item.quantity)
  }, 0)
  return options.format ? Currency.format(total) : total
}

const getTaxTotal = (
  items: {
    price?: Price;
    quantity?: Quantity;
    taxRate?: TaxRate;
  }[],
  options: Options = defaultOptions
) => {
  const total = items.reduce((sum, item) => {
    if (!item.price || !item.quantity || !item.taxRate) return sum
    return (sum += (+item.price * item.quantity * item.taxRate) / 100)
  }, 0)
  return options.format ? Currency.format(total) : total
}

const getGrandTotal = (
  items: { price?: Price; quantity?: Quantity; taxRate?: TaxRate }[],
  options: Options = defaultOptions
) => {
  const total = items.reduce((sum, item) => {
    if (!item.price || !item.quantity || !item.taxRate) return sum
    return (sum += +item.price * item.quantity * (1 + item.taxRate / 100))
  }, 0)
  return options.format ? Currency.format(total) : total
}

export const Calculations = {
  getSubtotal,
  getTaxTotal,
  getGrandTotal
}
