import { AuthCheck } from '../../helpers/auth'
import { ICtx } from '../../server'
import { MutationResolvers, QueryResolvers } from '../@types/types.d'
import { loginUser, registerUser, updateUser } from './methods'

export const userResolvers: {
  Query: QueryResolvers.Resolvers<ICtx>
  Mutation: MutationResolvers.Resolvers<ICtx>
} = {
  Query: {
    status: () => 'test!',
    async getUser(_, __, { user }) {
      AuthCheck.userExist(user)
      return user
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
    updateUser: async (_, { data }, { user }) => {
      AuthCheck.userExist(user)
      const updatedUser = await updateUser(user.id, data)
      return {
        message: 'user info has successfully been updated',
        user: updatedUser
      }
    }
  }
}
