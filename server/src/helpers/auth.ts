import { AuthenticationError } from 'apollo-server-core'
import { User } from '../Models/User'
import { IUser } from '../GraphQL/@types/types'

export const userExist = (user?: IUser) => {
  if (!user) throw new AuthenticationError('User Not Found')
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
      user,
      token: headers.jwt
    }
  } catch (e) {
    throw new AuthenticationError('You are not authorized')
  }
}

export const AuthCheck = {
  userExist,
  extractIdAndToken
}
