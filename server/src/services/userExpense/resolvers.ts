import { AuthCheck } from '../../helpers/auth'
import { IContext } from '../../server'
import { IMutationResolvers, IQueryResolvers } from '../@types/types'
import { UserExpenseRepository } from './repository'

export const userExpenseResolvers: {
  Query: IQueryResolvers<IContext>
  Mutation: IMutationResolvers<IContext>
} = {
  Query: {
    getUserExpenses: async (_, __, { user }) => {
      AuthCheck.userExist(user)
      return UserExpenseRepository.findByUserId(user.id)
    }
  },
  Mutation: {
    addUserExpense: async (_, { data }, { user }) => {
      AuthCheck.userExist(user)
      const newGenExp = await UserExpenseRepository.add({
        data,
        userId: user.id
      })
      return {
        message: 'success',
        userExpense: newGenExp
      }
    }
  }
}
