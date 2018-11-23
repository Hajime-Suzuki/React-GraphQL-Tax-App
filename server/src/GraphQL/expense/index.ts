import { makeExecutableSchema } from 'apollo-server-koa'
import { expenseSchema } from './schema'

export const mergedExpenseSchema = makeExecutableSchema({
  typeDefs: expenseSchema
})
