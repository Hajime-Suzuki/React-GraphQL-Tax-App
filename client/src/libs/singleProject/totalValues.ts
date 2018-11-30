export const calcOnlyTax = (items: any[]) => {
  const total = items.reduce(
    (total: number, item) =>
      (total +=
        (item.get('price') * item.get('quantity') * item.get('taxRate')) / 100),
    0
  )
  return Math.round(total * 100) / 100
}

// TODO: check types
export const calcTotalvalueWithoutTax = (items: any[]) => {
  const total = items.reduce(
    (total, item) => (total += item.get('price') * item.get('quantity')),
    0
  )
  return Math.round(total * 100) / 100
}
