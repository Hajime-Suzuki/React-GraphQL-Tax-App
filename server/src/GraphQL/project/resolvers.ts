import { ICtx } from '../../server'
import { MutationResolvers, QueryResolvers } from '../@types/types'
import { addProject, getProjectsByUserId, updateProject } from './methods'

export const projectResolvers: {
  Query: QueryResolvers.Resolvers
  Mutation: MutationResolvers.Resolvers<ICtx>
} = {
  Query: {
    getProjectsByUserId: async (_, { userId }) => {
      const projects = await getProjectsByUserId(userId)
      return projects
    }
  },
  Mutation: {
    updateProject: async (_, { projectId, data }) => {
      const project = await updateProject(projectId, data)
      return {
        success: true,
        message: `Project "${projectId}" has been updated`,
        project
      }
    },
    addProject: async (_, { data }, { userId }) => addProject(userId, data)
  }
}
