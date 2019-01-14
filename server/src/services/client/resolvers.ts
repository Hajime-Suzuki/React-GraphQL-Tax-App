import { AuthCheck } from '../../helpers/auth'
import { IContext } from '../../server'
import { MutationResolvers, QueryResolvers } from '../@types/types'
import { ClientCommands } from './domain/commands'
import { ApolloError } from 'apollo-server-koa'
import { ClientRepository } from './repository'
import { ClientQueries } from './domain/queries'

export const clientResolvers: {
  Query: QueryResolvers.Resolvers<IContext>
  Mutation: MutationResolvers.Resolvers<IContext>
} = {
  Query: {
    getClientsByUser: async (_, __, { user }) => {
      AuthCheck.userExist(user)
      return ClientQueries.getClientsByUser(user.id)
    },
    getSingleClient: async (_, { clientId }, { user }) => {
      AuthCheck.userExist(user)
      return ClientQueries.getClientById(clientId)
    },
    getClientByProject: async (_, { projectId }, { user }) => {
      AuthCheck.userExist(user)
      return ClientQueries.getClientByProject(projectId!)
    }
  },
  Mutation: {
    addClient: async (_, { data }, { user }) => {
      AuthCheck.userExist(user)
      const client = await ClientCommands.addClient(user.id, data)
      if (!client) throw new ApolloError('client could not be created')

      return { client }
    },
    updateClient: async (_, { clientId, data }, { user }) => {
      AuthCheck.userExist(user)
      const updatedClient = await ClientCommands.updateClient({
        clientId,
        userId: user.id,
        data
      })
      return {
        message: 'Client has successfully been updated',
        client: updatedClient
      }
    },
    updateClientProject: async (_, { clientId, projectId }, { user }) => {
      AuthCheck.userExist(user)
      // TODO:
      const client = await ClientCommands.updateClientProject(
        clientId!,
        projectId
      )
      return {
        client
      }
    },
    deleteClient: async (_, { clientId }, { user }) => {
      AuthCheck.userExist(user)
      const deletedClient = await ClientCommands.deleteClient(clientId)
      return {
        message: 'client has successfully been deleted',
        client: deletedClient
      }
    }
  }
}
