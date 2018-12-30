import { ICtx } from '../../server'
import { MutationResolvers, QueryResolvers } from '../@types/types'
import {
  addProject,
  getProjectsByUserId,
  updateProject,
  getSingleProject,
  deleteProject,
  generateInvoice
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
      const project = await updateProject(projectId, data)
      return {
        success: true,
        message: `Project "${projectId}" has been updated`,
        project
      }
    },
    deleteProject: async (_, { projectId }) => {
      const deletedProject = await deleteProject(projectId)
      return {
        success: true,
        message: 'project has been added',
        project: deletedProject
      }
    },
    downloadInvoice: async (_, { projectId }, { token }) => {
      const pdf = await generateInvoice(projectId, token)
      return {
        message: 'test',
        data: pdf
      }
    }
  }
}
