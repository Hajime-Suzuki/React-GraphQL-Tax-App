import { IResolvers, IResolverObject } from 'graphql-tools'
import { GetProjectsByUserQueryArgs } from '../@types/types'
import { getProjectsByUser } from './methods'
import { GraphQLScalarType, Kind } from 'graphql'
import { ExpenseAndIncome } from '../@types/types.d'
import { Project } from '../@types/types.d'

export const projectResolvers: IResolvers = {
  Query: {
    getProjectsByUser: async (_, { userId }: GetProjectsByUserQueryArgs) => {
      const projects = await getProjectsByUser(userId)
      return projects
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date Object',
    serialize: (value: any) => {
      console.log('serialize')
      return value
    },
    parseValue: () => {
      console.log('222222')
      return 'parse'
    },
    parseLiteral: () => {
      console.log('333333')
      return 'literal'
    }
  })
}
