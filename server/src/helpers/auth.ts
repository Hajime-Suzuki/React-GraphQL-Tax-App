import { AuthenticationError } from 'apollo-server-core'
import { UserRepository } from '../contexts/user/repository'
import { IUser } from '../contexts/@types/types'

export const userExist = (user?: IUser) => {
  if (!user) throw new AuthenticationError('User Not Found')
}

export const extractIdAndToken = async (headers: {
  [key: string]: any
  jwt: string
}) => {
  try {
    const user = await UserRepository.getByToken(headers.jwt)
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
