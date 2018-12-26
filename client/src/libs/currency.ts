const format = (value?: string | number | null) => {
  if (!value) return '-'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR'
  }).format(Number(value))
}

export const Currency = {
  format
}
