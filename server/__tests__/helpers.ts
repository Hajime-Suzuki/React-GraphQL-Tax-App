import { User } from '../src/graphql/user/User'

export const createUserAndGetToken = async (userData: any) => {
  const user = await User.create(userData)
  return { user, token: user.generateToken() }
}

export const Helpers = {
  createUserAndGetToken
}
