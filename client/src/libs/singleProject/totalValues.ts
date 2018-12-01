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
