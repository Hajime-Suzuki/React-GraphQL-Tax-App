import { AuthCheck } from '../../helpers/auth'
import { IContext } from '../../server'
import { IMutationResolvers, IQueryResolvers } from '../@types/types'
import { GeneralExpenseRepository } from './repository'

export const generalExpenseResolvers: {
  Query: IQueryResolvers<IContext>
  Mutation: IMutationResolvers<IContext>
} = {
  Query: {
    getGeneralExpenses: async (_, __, { user }) => {
      AuthCheck.userExist(user)
      return GeneralExpenseRepository.findByUserId(user.id)
    }
  },
  Mutation: {
    addGeneralExpense: async (_, { data }, { user }) => {
      AuthCheck.userExist(user)
      const newGenExp = await GeneralExpenseRepository.add({
        data,
        userId: user.id
      })
      return {
        message: 'success',
        generalExpense: newGenExp
      }
    }
  }
}
