import { AuthCheck } from '../../helpers/auth'
import { ICtx } from '../../server'
import { MutationResolvers, QueryResolvers } from '../@types/types'
import {
  addProject,
  deleteProject,
  generateInvoice,
  getProjectsByUserId,
  getSingleProject,
  updateProject
} from './methods'

export const projectResolvers: {
  Query: QueryResolvers.Resolvers<ICtx>
  Mutation: MutationResolvers.Resolvers<ICtx>
} = {
  Query: {
    getProjectsByUserId: (_, __, { user }) => {
      AuthCheck.userExist(user)
      return getProjectsByUserId(user.id)
    },
    getSingleProject: (_, { projectId }, { user }) => {
      AuthCheck.userExist(user)
      return getSingleProject(projectId)
    }
  },
  Mutation: {
    addProject: async (_, { data }, { user }) => {
      AuthCheck.userExist(user)
      return {
        success: true,
        message: 'project has been added',
        project: await addProject(user, data)
      }
    },
    updateProject: async (_, { projectId, data }, { user }) => {
      AuthCheck.userExist(user)
      const project = await updateProject(projectId, data)
      return {
        success: true,
        message: `Project "${projectId}" has been updated`,
        project
      }
    },
    deleteProject: async (_, { projectId }, { user }) => {
      AuthCheck.userExist(user)
      const deletedProject = await deleteProject(projectId)
      return {
        success: true,
        message: 'project has been added',
        project: deletedProject
      }
    },
    downloadInvoice: async (_, { projectId }, { token, user }) => {
      AuthCheck.userExist(user)
      const pdf = await generateInvoice(projectId, token)
      return {
        message: 'test',
        data: pdf
      }
    }
  }
}
