import { AuthCheck } from '../../helpers/auth'
import { IContext } from '../../server'
import { IMutationResolvers, IQueryResolvers } from '../@types/types'
import { UserCommands } from './domain/commands'
import { UserQueries } from './domain/queries'

export const userResolvers: {
  Query: IQueryResolvers<IContext>
  Mutation: IMutationResolvers<IContext>
} = {
  Query: {
    getUser: async (_, __, { user }) => {
      AuthCheck.userExist(user)
      return user
    }
  },
  Mutation: {
    registerUser: async (_, data) => {
      const token = await UserCommands.registerUser(data)

      return {
        success: true,
        message: 'user is created',
        token
      }
    },
    loginUser: async (_, data) => {
      const token = await UserQueries.loginUser(data)
      return {
        success: true,
        message: 'login success',
        token
      }
    },
    updateUser: async (_, { data }, { user }) => {
      AuthCheck.userExist(user)
      const updatedUser = await UserCommands.updateUser(user.id, data)
      return {
        message: 'user info has successfully been updated',
        user: updatedUser
      }
    },
    changePassword: async (_, { password, email }) => {
      const token = await UserCommands.changePassword(email, password)
      return {
        success: true,
        message: 'password has been rest',
        token
      }
    }
  }
}
