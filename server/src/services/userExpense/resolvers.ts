import { AuthCheck } from '../../helpers/auth'
import { IContext } from '../../server'
import { IMutationResolvers, IQueryResolvers } from '../@types/types'
import { UserCommands } from '../user/domain/commands'
import { UserExpenseCommands } from './domain/commands'
import { UserExpenseQueries } from './domain/queries'
import { UserExpenseRepository } from './repository'

export const userExpenseResolvers: {
  Query: IQueryResolvers<IContext>
  Mutation: IMutationResolvers<IContext>
} = {
  Query: {
    getUserExpenses: async (_, __, { user }) => {
      AuthCheck.userExist(user)
      return UserExpenseQueries.getExpenses(user.id)
    }
  },
  Mutation: {
    addUserExpense: async (_, { data }, { user }) => {
      AuthCheck.userExist(user)

      const newUserExp = await UserExpenseCommands.add(user.id, data)

      await UserCommands.updateUser(user.id, {
        $push: { expenses: newUserExp._id }
      })

      return {
        message: 'success',
        userExpense: newUserExp
      }
    },
    updateUserExpense: async (_, { id, data }, { user }) => {
      AuthCheck.userExist(user)
      const updated = await UserExpenseCommands.update(id, data)
      return {
        message: 'success',
        userExpense: updated
      }
    }
  }
}
