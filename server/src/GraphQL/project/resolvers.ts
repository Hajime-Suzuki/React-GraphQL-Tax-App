import { IResolverObject } from 'graphql-tools'
import { getProjectByUserId } from './methods'
import { GetProjectByUserIdQueryArgs } from '../@types/types'

export const projectResolvers: IResolverObject = {
  Query: {
    getProjectByUserId: (_, { userId }: GetProjectByUserIdQueryArgs) =>
      getProjectByUserId(userId)
  }
}
