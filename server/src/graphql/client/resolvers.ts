import { QueryResolvers } from '../@types/types'
import { getClientsByUserId, updateOrCreateClient } from './methods'
import { Client } from '../../Models/Client'
import { checkAuth } from '../../helpers/auth'
import { ICtx } from '../../server'

export const clientResolvers: { Query: QueryResolvers.Resolvers<ICtx> } = {
  Query: {
    getClientsByUser: async (_, __, { userId }) => {
      checkAuth(userId)
      return getClientsByUserId(userId)
    }
  }
}
