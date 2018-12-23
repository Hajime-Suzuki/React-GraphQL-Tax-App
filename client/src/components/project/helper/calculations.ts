import { Currency } from 'src/libs/currency'

const getSubtotal = (items: { price: string; quantity: number }[]) => {
  const total = items.reduce(
    (sum, item) => (sum += +item.price * item.quantity),
    0
  )
  return Currency.format(total)
}

const getTaxTotal = (
  items: { price: string; quantity: number; taxRate: number }[]
) => {
  const total = items.reduce(
    (sum, item) => (sum += (+item.price * item.quantity * item.taxRate) / 100),
    0
  )
  return Currency.format(total)
}

const getGrandTotal = (
  items: { price: string; quantity: number; taxRate: number }[]
) => {
  const total = items.reduce(
    (sum, item) =>
      (sum += +item.price * item.quantity * (1 + item.taxRate / 100)),
    0
  )
  return Currency.format(total)
}

export const Calculations = {
  getSubtotal,
  getTaxTotal,
  getGrandTotal
}
