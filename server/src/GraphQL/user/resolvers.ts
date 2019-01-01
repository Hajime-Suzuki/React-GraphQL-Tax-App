import { AuthenticationError } from 'apollo-server-koa'
import { ICtx } from '../../server'
import { MutationResolvers, QueryResolvers } from '../@types/types.d'
import { getUserById, loginUser, registerUser, updateUser } from './methods'

const checkAuth = (userId: string) => {
  if (!userId) throw new AuthenticationError('You are not authorized')
}

export const userResolvers: {
  Query: QueryResolvers.Resolvers<ICtx>
  Mutation: MutationResolvers.Resolvers<ICtx>
} = {
  Query: {
    async getUser(_, { id }, { userId }) {
      checkAuth(userId)
      return getUserById(id)
    }
  },
  Mutation: {
    registerUser: async (_, data) => {
      const token = await registerUser(data)
      return {
        success: true,
        message: 'user is created',
        token
      }
    },
    loginUser: async (_, data) => {
      const token = await loginUser(data)
      return {
        success: true,
        token
      }
    },
    updateUser: async (_, { data }, { userId }) => {
      checkAuth(userId)
      const updatedUser = await updateUser(userId, data)
      return {
        message: 'user info has successfully been updated',
        user: updatedUser
      }
    }
  }
}
