import { QueryResolvers, MutationResolvers } from './@types/resolvers'

export const resolvers: {
  Query: QueryResolvers.Resolvers
  Mutation: MutationResolvers.Resolvers
} = {
  Query: {},
  Mutation: {
    logout: () => {
      console.log('ashitoe')
      return 'hello'
    }
  }
}
