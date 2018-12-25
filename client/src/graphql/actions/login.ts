import { client } from '../client'
import { JWT } from 'src/libs/jwt'

export const logout = () => {
  localStorage.removeItem('jwt')
  client.writeData({ data: { userId: null } })
}

export const onLogin = (token: string) => {
  JWT.storeJwt(token)
  client.writeData({
    data: { userId: JWT.decodeJwt(token).id }
  })
}

export const LoginActions = {
  onLogin,
  logout
}
