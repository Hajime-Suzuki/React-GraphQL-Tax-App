import { AuthenticationError } from 'apollo-server-core'
import { User } from '../Models/User'

export const checkAuth = (userId: string) => {
  if (!userId) throw new AuthenticationError('You are not authorized')
}

export const extractIdAndToken = async (headers: {
  [key: string]: any
  jwt: string
}) => {
  try {
    const user = await User.findByToken(headers.jwt)
    user.verifyToken(headers.jwt)
    return {
      userId: user.id,
      token: headers.jwt
    }
  } catch (e) {
    throw new AuthenticationError('You are not authorized')
  }
}
