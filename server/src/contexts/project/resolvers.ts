import { AuthCheck } from '../../helpers/auth'
import { ICtx } from '../../server'
import { MutationResolvers, QueryResolvers, IClient } from '../@types/types'

import { ProjectDomain } from './domain'
import { ProjectRepository } from './repository'
import { ClientRepository } from '../client/repository'
import { ClientDomain } from '../client/domain'

export const projectResolvers: {
  Query: QueryResolvers.Resolvers<ICtx>
  Mutation: MutationResolvers.Resolvers<ICtx>
} = {
  Query: {
    getProjectsByUserId: async (_, __, { user }) => {
      AuthCheck.userExist(user)
      return ProjectRepository.findByUserId(user.id)
    },

    getSingleProject: async (_, { projectId }, { user }) => {
      AuthCheck.userExist(user)
      return ProjectRepository.findById(projectId)
    }
  },
  Mutation: {
    addProject: async (_, { data }, { user }) => {
      AuthCheck.userExist(user)

      const { project, client } = await ProjectDomain.addProject(user, data)

      return {
        success: true,
        message: 'project has been added',
        project,
        ...(client && { client })
      }
    },

    updateProject: async (_, { projectId, data }, { user }) => {
      AuthCheck.userExist(user)
      const project = await ProjectDomain.updateProject(projectId, data)

      let updatedClient: IClient | null = null
      if (data.client) {
        updatedClient = await ClientDomain.updateClientProject(
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
      const deletedProject = await ProjectDomain.deleteProject(projectId)
      return {
        success: true,
        message: 'project has been added',
        project: deletedProject
      }
    },

    downloadInvoice: async (_, { projectId }, { token, user }) => {
      AuthCheck.userExist(user)
      const pdf = await ProjectDomain.generateInvoice(projectId, token)
      return {
        message: 'test',
        data: pdf
      }
    }
  }
}
