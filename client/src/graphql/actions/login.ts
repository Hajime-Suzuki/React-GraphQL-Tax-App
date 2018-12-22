import { decodeJwt, storeJwt } from 'src/libs/jwt'
import { client } from '../client'

// mutation vs action

export const logout = () => {
  localStorage.removeItem('jwt')
  client.writeData({ data: { userId: null } })
}

export const onLogin = (token: string) => {
  storeJwt(token)
  client.writeData({
    data: { userId: decodeJwt(token).id }
  })
}

export const LoginActions = {
  onLogin,
  logout
}
