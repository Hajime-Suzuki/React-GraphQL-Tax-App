import { AuthCheck } from '../../helpers/auth'
import { IContext } from '../../server'
import { MutationResolvers, QueryResolvers, IClient } from '../@types/types'

import { ProjectCommands } from './domain/commands'
import { ProjectRepository } from './repository'
import { ClientRepository } from '../client/repository'
import { ClientCommands } from '../client/domain/commands'
import { clientResolvers } from '../client/resolvers'
import { ClientQueries } from '../client/domain/queries'
import { ProjectQueries } from './domain/queries'
import { ProjectManager } from './domain/manager'

export const projectResolvers: {
  Query: QueryResolvers.Resolvers<IContext>
  Mutation: MutationResolvers.Resolvers<IContext>
} = {
  Query: {
    getProjectsByUserId: async (_, __, { user }) => {
      AuthCheck.userExist(user)
      return ProjectQueries.getProjectsByUserId(user.id)
    },

    getSingleProject: async (_, { projectId }, { user }) => {
      AuthCheck.userExist(user)
      return ProjectQueries.getSingleProject(projectId)
    }
  },
  Mutation: {
    addProject: async (_, { data }, { user }) => {
      AuthCheck.userExist(user)

      // const { client: clientInput, ...userData } = data

      // const savedProject = await ProjectCommands.addProject(user, userData)

      // // TODO: chnage
      // const client =
      //   clientInput && (await ProjectManager.getClientByUser(user.id))

      // if (client) {
      //   await ProjectManager.updateClientProject(client.id, savedProject.id)
      // }

      return {
        success: true,
        message: 'project has been added',
        project: savedProject
        // ...(client && { client })
      }
    },

    updateProject: async (_, { projectId, data }, { user }) => {
      AuthCheck.userExist(user)
      const project = await ProjectCommands.updateProject(projectId, data)

      let updatedClient: IClient | null = null
      if (data.client) {
        updatedClient = await ClientQueries.updateClientProject(
          data.client.id,
          project.id
        )
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
      const deletedProject = await ProjectCommands.deleteProject(projectId)
      return {
        success: true,
        message: 'project has been added',
        project: deletedProject
      }
    },

    downloadInvoice: async (_, { projectId }, { token, user }) => {
      AuthCheck.userExist(user)
      const pdf = await ProjectCommands.generateInvoice(projectId, token)
      return {
        message: 'test',
        data: pdf
      }
    }
  }
}
