import { AuthenticationError } from 'apollo-server-core'

import { IUser } from '../GraphQL/@types/types'
import { User } from '../graphql/user/model'
import { UserRepository } from '../graphql/user/repository'

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
