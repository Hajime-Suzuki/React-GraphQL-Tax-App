import { AuthCheck } from '../../helpers/auth'
import { IContext } from '../../server'
import { IMutationResolvers, IQueryResolvers } from '../@types/types'
import { ProjectCommands } from './domain/commands'
import { ProjectQueries } from './domain/queries'

export const projectResolvers: {
  Query: IQueryResolvers<IContext>
  Mutation: IMutationResolvers<IContext>
} = {
  Query: {
    getProjectsByUserId: async (_, __, { user }) => {
      AuthCheck.userExist(user)
      return ProjectQueries.getProjectsByUserId(user.id)
    },
    getProjects: async (_, { filter, sortOption }, { user }) => {
      AuthCheck.userExist(user)
      return ProjectQueries.getProjects(
        filter || undefined,
        sortOption || undefined
      )
    },
    getSingleProject: async (_, { projectId }, { user }) => {
      AuthCheck.userExist(user)
      return ProjectQueries.getSingleProject(projectId)
    }
  },
  Mutation: {
    addProject: async (_, { data }, { user }) => {
      AuthCheck.userExist(user)

      const { savedProject, client } = await ProjectCommands.addProject(
        user,
        data
      )

      return {
        success: true,
        message: 'project has been added',
        project: savedProject,
        ...(client && { client })
      }
    },

    updateProject: async (_, { projectId, data }, { user }) => {
      AuthCheck.userExist(user)
      const {
        updatedClient,
        updatedProject
      } = await ProjectCommands.updateProject(projectId, data)

      return {
        success: true,
        message: `Project "${projectId}" has been updated`,
        project: updatedProject,
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
    }
  }
}
