import { Calculations } from '../../helpers/calculation'
import { ProjectRepository } from '../project/repository'
import { UserRepository } from '../user/repository'
import { ClientRepository } from '../client/repository'
import { IProject } from '../@types/types'
import { format } from 'date-fns'

const getAllDataForInvoice = async (projectId: string, userId: string) => {
  const project = await ProjectRepository.findById(projectId)
  if (!project) throw new Error('project not found')

  const user = await UserRepository.findById(project.user)
  if (!user) throw new Error('user not found')

  const client = await ClientRepository.findByProjectId(projectId)
  if (!client) throw new Error('client not found')

  if (user.id !== userId!) {
    throw new Error('You are not allowed to download somebody\'s invoice')
  }

  const {
    projects: _,
    clients: __,
    expenses: ___,
    ...userInfo
  } = user.toObject()

  const { incomes, ...invoiceInfo }: IProject = project.toObject()

  invoiceInfo.invoiceDate = format(
    new Date(invoiceInfo.invoiceDate),
    'dd-MM-YYYY'
  )

  return {
    userInfo,
    invoiceInfo,
    clientInfo: client || {},
    incomes: incomes
      ? incomes.map(income => ({
          ...income,
          price: Calculations.formatCurrency(income.price)
        }))
      : [],
    totalPrices: incomes ? Calculations.getGrandTotal(incomes) : 0
  }
}

export const InvoiceQueries = {
  getAllDataForInvoice
}
