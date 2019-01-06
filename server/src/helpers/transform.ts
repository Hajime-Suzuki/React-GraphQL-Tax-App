export const removeEmptyProperty = <Type>(obj: any): Partial<Type> => {
  const newObj: any = {}
  Object.keys(obj).forEach(k => {
    if (obj[k]) newObj[k] = obj[k]
  })
  return newObj
}
