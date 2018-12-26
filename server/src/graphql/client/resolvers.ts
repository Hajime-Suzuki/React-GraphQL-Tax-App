import { QueryResolvers } from '../@types/types'
import { getClientsByUserId, updateOrCreateClient } from './methods'
import { Client } from '../../Models/Client'

export const clientResolvers: { Query: QueryResolvers.Resolvers } = {
  Query: {
    getClientsByUser: async (_, { userId }) => {
      return getClientsByUserId(userId)
    }
  }
}
