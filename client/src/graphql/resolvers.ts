import { InMemoryCache } from 'apollo-cache-inmemory'
import { MutationResolvers, QueryResolvers } from './@types/resolvers'

export const resolvers: {
  Query: QueryResolvers.Resolvers
  Mutation: MutationResolvers.Resolvers<{ cache: InMemoryCache }>
} = {
  Query: {},
  Mutation: {
    logout: (_, __, { cache }) => {
      cache.writeData({ data: { userId: null } })
      localStorage.removeItem('jwt')
      console.log('logout')
      return 'hello'
    }
  }
}
