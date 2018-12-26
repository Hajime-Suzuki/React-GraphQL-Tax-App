export const removeEmptyProperty = <T>(obj: any): Partial<T> => {
  const newObj: any = {}
  Object.keys(obj).forEach(k => {
    if (obj[k]) newObj[k] = obj[k]
  })
  return newObj
}
