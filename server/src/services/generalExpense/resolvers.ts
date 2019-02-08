import { QueryResolvers, MutationResolvers } from '../@types/types'
import { IContext } from '../../server'
import { AuthCheck } from '../../helpers/auth'
import { GeneralExpenseRepository } from './repository'
import { GeneralExpense } from './model'

export const generalExpenseResolvers: {
  Query: QueryResolvers.Resolvers<IContext>
  Mutation: MutationResolvers.Resolvers<IContext>
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
