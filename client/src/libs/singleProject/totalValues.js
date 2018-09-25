export const calcOnlyTax = items => {
  const total = items.reduce(
    (total, item) => (total += (item.get('price') * item.get('taxRate')) / 100),
    0
  )
  return Math.round(total * 100) / 100
}

export const calcTotalvalueWithoutTax = items => {
  const total = items.reduce((total, item) => (total += item.get('price')), 0)
  return Math.round(total * 100) / 100
}

// export const calcTotalTax = items=>{
//   const total = items.reduce((total, item) => (total += item.get('price')), 0)
//   return Math.round(total * 100) / 100
// }
