export const removeEmptyProperty = <T>(obj: any): Partial<T> => {
  const newObj: any = {}
  Object.keys(obj).forEach(k => {
    if (obj[k] !== undefined && obj[k] !== null) newObj[k] = obj[k]
  })
  return newObj
}
