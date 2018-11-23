import { makeExecutableSchema } from 'apollo-server-koa'
import { contactPersonSchema } from './schema'

export const mergedContactPersonSchema = makeExecutableSchema({
  typeDefs: contactPersonSchema
})
