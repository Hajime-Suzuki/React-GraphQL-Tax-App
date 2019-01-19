import { AuthCheck } from '../../helpers/auth'
import { IContext } from '../../server'
import { MutationResolvers } from '../@types/types'
import { InvoiceCommands } from './commands'

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
