import { AuthCheck } from '../../helpers/auth'
import { ICtx } from '../../server'
import { MutationResolvers, QueryResolvers } from '../@types/types'
import {
  getClientsByUserId,
  getSingleClient,
  updateClient,
  deleteClient,
  getClientByProject,
  updateClientProject
} from './domain'
import { ApolloError } from 'apollo-server-koa'

export const clientResolvers: {
  Query: QueryResolvers.Resolvers<ICtx>
  Mutation: MutationResolvers.Resolvers<ICtx>
} = {
  Query: {
    getClientsByUser: async (_, __, { user }) => {
      AuthCheck.userExist(user)
      return getClientsByUserId(user.id)
    },
    getSingleClient: async (_, { clientId }, { user }) => {
      AuthCheck.userExist(user)
      const client = await getSingleClient(clientId)
      return client
    },
    getClientByProject: async (_, { projectId }, { user }) => {
      AuthCheck.userExist(user)
      return getClientByProject(projectId!)
    }
  },
  Mutation: {
    addClient: async (_, { data }, { user }) => {
      AuthCheck.userExist(user)
      const client = await findClientOrCreate(user.id, data)
      if (!client) throw new ApolloError('client could not be created')
      return { client }
    },
    updateClient: async (_, { clientId, data }, { user }) => {
      AuthCheck.userExist(user)
      const updatedClient = await updateClient({
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
      const client = await updateClientProject(clientId, projectId)
      return {
        client
      }
    },
    deleteClient: async (_, { clientId }, { user }) => {
      AuthCheck.userExist(user)
      const deletedClient = await deleteClient(clientId)
      return {
        message: 'client has successfully been deleted',
        client: deletedClient
      }
    }
  }
}
