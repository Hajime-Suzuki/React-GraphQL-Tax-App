import { QueryResolvers, MutationResolvers } from './@types/resolvers'
import ApolloClient from 'apollo-client'

export const resolvers: {
  Query: QueryResolvers.Resolvers
  Mutation: MutationResolvers.Resolvers<ApolloClient<{ userId: string }>>
} = {
  Query: {},
  Mutation: {
    logout: (_, __, { cache }) => {
      localStorage.removeItem('jwt')
      cache.writeData({ data: { userId: null } })
      return 'success'
    }
  }
}
