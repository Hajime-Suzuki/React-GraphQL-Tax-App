import { JWT } from 'src/libs/jwt'
import { client } from '../client'

export const logout = async () => {
  localStorage.removeItem('jwt')
  try {
    await client.resetStore()
  } catch (e) {
    console.log(e)
  }
  client.writeData({ data: { userId: null } })
}

export const onLogin = async (token: string) => {
  JWT.storeJwt(token)
  try {
    await client.resetStore()
  } catch (e) {
    console.log(e)
  }
  client.writeData({
    data: { userId: JWT.decodeJwt(token).id }
  })
}

export const LoginActions = {
  onLogin,
  logout
}
