import { AuthCheck } from '../../helpers/auth'
import { ICtx } from '../../server'
import { MutationResolvers, QueryResolvers } from '../@types/types'
import { ClientDomain } from './domain'
import { ApolloError } from 'apollo-server-koa'
import { ClientRepository } from './repository'

export const clientResolvers: {
  Query: QueryResolvers.Resolvers<ICtx>
  Mutation: MutationResolvers.Resolvers<ICtx>
} = {
  Query: {
    getClientsByUser: async (_, __, { user }) => {
      AuthCheck.userExist(user)
      return ClientRepository.findByUserId(user.id)
    },
    getSingleClient: async (_, { clientId }, { user }) => {
      AuthCheck.userExist(user)
      return ClientRepository.findById(clientId)
    },
    getClientByProject: async (_, { projectId }, { user }) => {
      AuthCheck.userExist(user)
      return ClientRepository.findByProjectId(projectId!)
    }
  },
  Mutation: {
    addClient: async (_, { data }, { user }) => {
      AuthCheck.userExist(user)
      const client = await ClientDomain.addClient(user.id, data)
      if (!client) throw new ApolloError('client could not be created')
      return { client }
    },
    updateClient: async (_, { clientId, data }, { user }) => {
      AuthCheck.userExist(user)
      const updatedClient = await ClientDomain.updateClient({
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
      const client = await ClientDomain.updateClientProject(clientId, projectId)
      return {
        client
      }
    },
    deleteClient: async (_, { clientId }, { user }) => {
      AuthCheck.userExist(user)
      const deletedClient = await ClientDomain.deleteClient(clientId)
      return {
        message: 'client has successfully been deleted',
        client: deletedClient
      }
    }
  }
}
