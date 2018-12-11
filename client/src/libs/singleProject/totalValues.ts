export const calcOnlyTax = items => {
  const total = items.reduce(
    (sum, item) =>
      (sum +=
        (item.get('price') * item.get('quantity') * item.get('taxRate')) / 100),
    0
  )
  return Math.round(total * 100) / 100
}

export const calcTotalvalueWithoutTax = items => {
  const total = items.reduce(
    (sum, item) => (sum += item.get('price') * item.get('quantity')),
    0
  )
  return Math.round(total * 100) / 100
}

export const calcTotalvalueWithoutTax2 = (
  items: {
    price: number
    quantity: number
  }[]
) => {
  const total = items.reduce(
    (sum, item) => (sum += item.price * item.quantity),
    0
  )
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR'
  }).format(total)
}
