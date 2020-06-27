import { AuthCheck } from '../../helpers/auth'
import { IContext } from '../../server'
import { IMutationResolvers } from '../@types/types'
import { InvoiceCommands } from './commands'

export const invoiceResolvers: {
  Mutation: IMutationResolvers<IContext>
} = {
  Mutation: {
    downloadInvoice: async (_, { projectId }, { user }) => {
      AuthCheck.userExist(user)
      const pdf = await InvoiceCommands.getInvoicePDF(projectId, user.id)
      return {
        message: 'test',
        data: pdf,
      }
    },
  },
}
