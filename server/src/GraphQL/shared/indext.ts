import { makeExecutableSchema } from 'graphql-tools'
import { sharedTypes } from './sharedTypes'

export const mergedSharedSchema = makeExecutableSchema({
  typeDefs: sharedTypes
  // resolvers: projectResolvers
})
