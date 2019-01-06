import { AuthCheck } from '../../helpers/auth'
import { ICtx } from '../../server'
import { MutationResolvers, QueryResolvers } from '../@types/types'
import { getClientsByUserId, getSingleClient, updateClient } from './methods'

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
    }
  },
  Mutation: {
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
    }
  }
}
