import { IResolverObject } from 'graphql-tools'
import { getProjectByUserId } from './methods'

export const projectResolvers: IResolverObject = {
  Query: {
    getProjectByUserId: (_, { userId }: any) => getProjectByUserId(userId)
  }
}
