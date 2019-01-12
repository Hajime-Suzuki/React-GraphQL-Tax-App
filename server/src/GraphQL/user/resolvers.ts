import { AuthCheck } from '../../helpers/auth'
import { ICtx } from '../../server'
import { MutationResolvers, QueryResolvers } from '../@types/types.d'
import { UserDomain } from './domain'

export const userResolvers: {
  Query: QueryResolvers.Resolvers<ICtx>
  Mutation: MutationResolvers.Resolvers<ICtx>
} = {
  Query: {
    async getUser(_, __, { user }) {
      AuthCheck.userExist(user)
      return user
    }
  },
  Mutation: {
    registerUser: async (_, data) => {
      const token = await UserDomain.registerUser(data)
      return {
        success: true,
        message: 'user is created',
        token
      }
    },
    loginUser: async (_, data) => {
      const token = await UserDomain.loginUser(data)
      return {
        success: true,
        token
      }
    },
    updateUser: async (_, { data }, { user }) => {
      AuthCheck.userExist(user)
      const updatedUser = await UserDomain.updateUser(user.id, data)
      return {
        message: 'user info has successfully been updated',
        user: updatedUser
      }
    }
  }
}
