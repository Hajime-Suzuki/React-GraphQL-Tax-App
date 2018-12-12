import { AuthenticationError } from 'apollo-server-koa'
import { ICtx } from '../../server'
import { MutationResolvers, QueryResolvers } from '../@types/types.d'
import { getUserById, loginUser, registerUser } from './methods'

export const userResolvers: {
  Query: QueryResolvers.Resolvers<ICtx>
  Mutation: MutationResolvers.Resolvers
} = {
  Query: {
    async getUser(_, { id }, { userId }) {
      if (!userId) throw new AuthenticationError('You are not authorized')
      return getUserById(id)
    }
  },
  Mutation: {
    registerUser: (_, data) => registerUser(data),
    loginUser: (_, data) => loginUser(data)
  }
}
