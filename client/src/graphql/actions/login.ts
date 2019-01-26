import { client as CLI } from '../client'
import { JWT } from 'src/libs/jwt'
import { GetUser } from '../components/login'

export const logout = async () => {
  console.log('logout!')
  localStorage.removeItem('jwt')
  try {
    await CLI.resetStore()
  } catch (e) {
    console.log(e)
  }
  CLI.writeData({ data: { userId: null } })
  CLI.writeQuery({ query: GetUser.Document, data: { getUser: null } })
  console.log('clear')
}

export const onLogin = (token: string, client: any) => {
  console.log('login')
  // JWT.storeJwt(token)
  console.log('store')
  CLI.writeData({
    data: { userId: JWT.decodeJwt(token).id }
  })
  console.log('write')
  try {
    CLI.readQuery({ query: GetUser.Document })
  } catch (e) {
    console.log(e)
  }
}

export const LoginActions = {
  onLogin,
  logout
}
