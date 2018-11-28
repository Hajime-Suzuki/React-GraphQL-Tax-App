import { makeExecutableSchema } from 'graphql-tools'
import { projectResolvers } from '../project/resolvers'
import { projectSchema } from './schema'

export const mergedProjectSchema = makeExecutableSchema({
  typeDefs: projectSchema
  // resolvers: projectResolvers
})
