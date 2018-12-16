import { MutationResolvers, QueryResolvers } from '../@types/types'
import { getProjectsByUserId, updateProject, addProject } from './methods'
import { ICtx } from '../../server'
import { AuthenticationError } from 'apollo-server-koa'
import { Project } from '../../Models/Project'

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
