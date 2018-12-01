export const decodeJwt = (token: string) => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}

export const storeJwt = token => {
  localStorage.setItem('jwt', token)
}

export const getJwt = () => localStorage.getItem('jwt')

const token = getJwt()
export const USER_ID = token ? decodeJwt(token).id : null
