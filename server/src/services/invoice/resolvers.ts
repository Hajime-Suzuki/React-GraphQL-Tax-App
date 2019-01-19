import { AuthCheck } from '../../helpers/auth'

import { ProjectCommands } from '../project/domain/commands'
import { InvoiceCommands } from './commands'
import { MutationResolvers } from '../@types/types'
import { IContext } from '../../server'

export const invoiceResolvers: {
  Mutation: MutationResolvers.Resolvers<IContext>;
} = {
  Mutation: {
    downloadInvoice: async (_, { projectId }, { token, user }) => {
      AuthCheck.userExist(user)
      const pdf = await InvoiceCommands.getInvoicePDF(projectId, token)
      return {
        message: 'test',
        data: pdf
      }
    }
  }
}
