import { AuthCheck } from '../../helpers/auth'
import { ICtx } from '../../server'
import { MutationResolvers, QueryResolvers } from '../@types/types'
import { ClientDomain } from './domain'
import { ApolloError } from 'apollo-server-koa'
import { ClientRepository } from './repository'
import { ClientActions } from './actionts'

export const clientResolvers: {
  Query: QueryResolvers.Resolvers<ICtx>
  Mutation: MutationResolvers.Resolvers<ICtx>
} = {
  Query: {
    getClientsByUser: async (_, __, { user }) => {
      AuthCheck.userExist(user)
      return ClientActions.getClientsByUser(user.id)
    },
    getSingleClient: async (_, { clientId }, { user }) => {
      AuthCheck.userExist(user)
      return ClientActions.getSingleClient(clientId)
    },
    getClientByProject: async (_, { projectId }, { user }) => {
      AuthCheck.userExist(user)
      return ClientActions.getClientByProject(projectId!)
    }
  },
  Mutation: {
    addClient: async (_, { data }, { user }) => {
      AuthCheck.userExist(user)
      const client = await ClientActions.addClient(user.id, data)
      if (!client) throw new ApolloError('client could not be created')
      return { client }
    },
    updateClient: async (_, { clientId, data }, { user }) => {
      AuthCheck.userExist(user)
      const updatedClient = await ClientActions.updateClient(
        clientId,
        user.id,
        data
      )
      return {
        message: 'Client has successfully been updated',
        client: updatedClient
      }
    },
    updateClientProject: async (_, { clientId, projectId }, { user }) => {
      AuthCheck.userExist(user)
      const client = await ClientActions.updateClientProject(
        clientId,
        projectId
      )
      return {
        client
      }
    },
    deleteClient: async (_, { clientId }, { user }) => {
      AuthCheck.userExist(user)
      const deletedClient = await ClientActions.deleteClient(clientId)
      return {
        message: 'client has successfully been deleted',
        client: deletedClient
      }
    }
  }
}
