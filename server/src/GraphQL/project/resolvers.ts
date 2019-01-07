import { AuthCheck } from '../../helpers/auth'
import { ICtx } from '../../server'
import { MutationResolvers, QueryResolvers, IClient } from '../@types/types'
import {
  findClientOrCreate,
  pushProjectId,
  updateClientProject
} from '../client/methods'
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
      const clientInput = data.client

      const project = await addProject(user, data)
      const client =
        clientInput && (await findClientOrCreate(user.id, clientInput))

      if (client) {
        await pushProjectId(client.id, project.id)
      }

      return {
        success: true,
        message: 'project has been added',
        project,
        ...(client && { client })
      }
    },
    updateProject: async (_, { projectId, data }, { user }) => {
      AuthCheck.userExist(user)
      const project = await updateProject(projectId, data)

      let updatedClient: IClient | null = null
      if (data.client) {
        updatedClient = await updateClientProject(data.client.id, project.id)
      }

      return {
        success: true,
        message: `Project "${projectId}" has been updated`,
        project,
        client: updatedClient
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
