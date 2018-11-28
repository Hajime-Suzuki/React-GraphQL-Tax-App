import { userSchema } from './schema'
import { makeExecutableSchema } from 'graphql-tools'
import { userResolvers } from './resolvers'

export const mergedUserSchema = makeExecutableSchema({
  typeDefs: userSchema
  // resolvers: userResolvers
})
