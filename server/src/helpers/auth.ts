import { AuthenticationError } from 'apollo-server-core'
import { IUser } from '../services/@types/types'
import { UserRepository } from '../services/user/repository'

export const userExist = (user?: IUser) => {
  if (!user) throw new AuthenticationError('User Not Found')
}

export const extractIdAndToken = async (headers: {
  [key: string]: any
  jwt: string
}) => {
  try {
    const user = await UserRepository.findByToken(headers.jwt)
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
