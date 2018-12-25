import { Currency } from '../../../libs/currency'

type Price = string | null
type Quantity = number | null
type TaxRate = number | null

const getSubtotal = (items: { price?: Price; quantity?: Quantity }[]) => {
  console.log(items)
  const total = items.reduce((sum, item) => {
    if (!item.price || !item.quantity) return sum
    return (sum += +item.price * item.quantity)
  }, 0)
  return Currency.format(total)
}

const getTaxTotal = (
  items: {
    price?: Price
    quantity?: Quantity
    taxRate?: TaxRate
  }[]
) => {
  const total = items.reduce((sum, item) => {
    if (!item.price || !item.quantity || !item.taxRate) return sum
    return (sum += (+item.price * item.quantity * item.taxRate) / 100)
  }, 0)
  return Currency.format(total)
}

const getGrandTotal = (
  items: { price?: Price; quantity?: Quantity; taxRate?: TaxRate }[]
) => {
  const total = items.reduce((sum, item) => {
    if (!item.price || !item.quantity || !item.taxRate) return sum
    return (sum += +item.price * item.quantity * (1 + item.taxRate / 100))
  }, 0)
  return Currency.format(total)
}

export const Calculations = {
  getSubtotal,
  getTaxTotal,
  getGrandTotal
}
