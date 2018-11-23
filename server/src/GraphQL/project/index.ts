import { makeExecutableSchema } from 'apollo-server-koa'
import { projectSchema } from './schema'

export const mergedProjectSchema = makeExecutableSchema({
  typeDefs: projectSchema
})
