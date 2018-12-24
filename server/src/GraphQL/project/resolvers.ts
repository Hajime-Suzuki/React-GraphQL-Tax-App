import { ICtx } from '../../server'
import { MutationResolvers, QueryResolvers } from '../@types/types'
import {
  addProject,
  getProjectsByUserId,
  updateProject,
  getSingleProject
} from './methods'

export const projectResolvers: {
  Query: QueryResolvers.Resolvers
  Mutation: MutationResolvers.Resolvers<ICtx>
} = {
  Query: {
    getProjectsByUserId: (_, { userId }) => getProjectsByUserId(userId),
    getSingleProject: (_, { projectId }) => getSingleProject(projectId)
  },
  Mutation: {
    addProject: async (_, { data }, { userId }) => addProject(userId, data),
    updateProject: async (_, { projectId, data }) => {
      console.log(projectId, data)
      const project = await updateProject(projectId, data)
      return {
        success: true,
        message: `Project "${projectId}" has been updated`,
        project
      }
    }
  }
}
