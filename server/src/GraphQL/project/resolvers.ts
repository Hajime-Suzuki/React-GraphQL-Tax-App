import { GraphQLScalarType } from 'graphql'
import { QueryResolvers, ProjectResolvers } from '../@types/types'
import { getProjectsByUserId } from './methods'

export const projectResolvers: { Query: QueryResolvers.Resolvers } = {
  Query: {
    getProjectsByUserId: async (_, { userId }) => {
      const projects = await getProjectsByUserId(userId)
      return projects
    }
  }
  // Date: new GraphQLScalarType({
  //   name: 'Date',
  //   description: 'Date Object',
  //   serialize: (value: any) => {
  //     console.log('serialize')
  //     return value
  //   },
  //   parseValue: () => {
  //     console.log('222222')
  //     return 'parse'
  //   },
  //   parseLiteral: () => {
  //     console.log('333333')
  //     return 'literal'
  //   }
  // })
}
