type Price = string | null
type Quantity = number | null
type TaxRate = number | null

const format = (value?: string | number | null) => {
  if (!value) return '-'
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR'
  }).format(+value)
}

const getGrandTotal = (
  items: Array<{ price?: Price; quantity?: Quantity; taxRate?: TaxRate }>
) => {
  const total = items.reduce(
    (obj, item) => {
      if (!item.price || !item.quantity || !item.taxRate) {
        return obj
      }
      obj.subtotal += +item.price * item.quantity
      obj.taxTotal += (+item.price * item.quantity * item.taxRate) / 100
      obj.grandTotal += +item.price * item.quantity * (1 + item.taxRate / 100)

      return obj
    },
    {
      subtotal: 0,
      taxTotal: 0,
      grandTotal: 0
    }
  )
  Object.keys(total).forEach(key => {
    (total as any)[key] = format((total as any)[key])
  })
  return total
}

export const Calculations = {
  format,
  getGrandTotal
}
