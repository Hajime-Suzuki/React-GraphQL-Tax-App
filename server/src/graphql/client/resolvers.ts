import { QueryResolvers, MutationResolvers } from '../@types/types'
import {
  getClientsByUserId,
  updateOrCreateClient,
  getSingleClient,
  updateClient
} from './methods'
import { Client } from '../../Models/Client'
import { ICtx } from '../../server'
import { checkAuth } from '../../helpers/auth'

export const clientResolvers: {
  Query: QueryResolvers.Resolvers<ICtx>
  Mutation: MutationResolvers.Resolvers<ICtx>
} = {
  Query: {
    getClientsByUser: async (_, __, { userId }) => {
      checkAuth(userId)
      return getClientsByUserId(userId)
    },
    getSingleClient: async (_, { clientId }, { userId }) => {
      checkAuth(userId)
      const client = await getSingleClient(clientId)
      return client
    }
  },
  Mutation: {
    updateClient: async (_, { clientId, data }, { userId }) => {
      checkAuth(userId)
      const updatedClient = await updateClient({ clientId, userId, data })
      console.log(updatedClient)
      return {
        message: 'Client has successfully been updated',
        client: updatedClient
      }
    }
  }
}
