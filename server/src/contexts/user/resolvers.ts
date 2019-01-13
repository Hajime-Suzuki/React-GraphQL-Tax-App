import { AuthCheck } from '../../helpers/auth'
import { ICtx } from '../../server'
import { MutationResolvers, QueryResolvers } from '../@types/types.d'
import { UserActions } from './actions'
import { UserDomain } from './domain'
import { User } from './model'

export const userResolvers: {
  Query: QueryResolvers.Resolvers<ICtx>
  Mutation: MutationResolvers.Resolvers<ICtx>
} = {
  Query: {
    getUser: async (_, __, { user }) => UserActions.getUser(user)
  },
  Mutation: {
    registerUser: async (_, data) => {
      const token = await UserActions.registerUser(data)
      return {
        success: true,
        message: 'user is created',
        token
      }
    },
    loginUser: async (_, data) => {
      const token = await UserActions.loginUser(data)
      return {
        success: true,
        message: 'login success',
        token
      }
    },
    updateUser: async (_, { data }, { user }) => {
      AuthCheck.userExist(user)
      const updatedUser = await UserActions.updateUser(user.id, data)
      return {
        message: 'user info has successfully been updated',
        user: updatedUser
      }
    }
  }
}
