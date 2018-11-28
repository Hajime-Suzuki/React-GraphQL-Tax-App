import { AuthenticationError } from 'apollo-server-koa'
import { IResolverObject } from 'graphql-tools'
import { ICtx } from '../../server'
import {
  GetUserQueryArgs,
  LoginUserMutationArgs,
  RegisterResponse,
  RegisterUserMutationArgs
} from '../@types/types.d'
import { getUserById, loginUser, registerUser } from './methods'

export const userResolvers: IResolverObject = {
  Query: {
    async getUser(_, { id }: GetUserQueryArgs, { userId }: ICtx) {
      if (!userId) throw new AuthenticationError('You are not authorized')
      return getUserById(id)
    }
  },
  Mutation: {
    // TODO: add validation
    registerUser: (
      _,
      data: RegisterUserMutationArgs
    ): Promise<RegisterResponse> => registerUser(data),

    loginUser: (_, data: LoginUserMutationArgs): Promise<RegisterResponse> =>
      loginUser(data)
  }
}
