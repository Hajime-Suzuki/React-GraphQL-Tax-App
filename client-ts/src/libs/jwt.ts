export const decodeJwt = (token: string) => {
  var base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}

export const storeJwt = (token: string) => {
  localStorage.setItem('jwt', token)
}

export const getJwt = () => localStorage.getItem('jwt')
