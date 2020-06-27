import { format } from 'date-fns'
import { IProject } from '../@types/types'
import { ClientRepository } from '../client/repository'
import { ProjectRepository } from '../project/repository'
import { UserRepository } from '../user/repository'

interface Invoice {
  invoiceInfo: InvoiceInfo
  sender: ISender
  receiver: IReceiver
  items: Item[]
}

interface ISender {
  name: string
  email: string
  phone: string
  btw: string
  kvk: string
  iban: string
  address: IAddress
}

interface IReceiver {
  name: string
  email: string
  address: IAddress
}

interface IAddress {
  streetAddress: string
  postalCode: string
  city: string
  country: string
}

interface InvoiceInfo {
  invoiceTitle: string
  invoiceNumber: string
  invoiceDate: string
}

interface Item {
  name: string
  price: string
  quantity: number
  taxRate: string
}

interface IPayload {
  invoice: Invoice
  key: string
}

export const getGenerateInvoicePayload = async (
  projectId: string,
  userId: string,
): Promise<IPayload> => {
  const project = await ProjectRepository.findById(projectId)
  if (!project) throw new Error('project not found')

  const user = await UserRepository.findById(project.user)
  if (!user) throw new Error('user not found')

  const client = await ClientRepository.findByProjectId(projectId)
  if (!client) throw new Error('client not found')

  if (user.id !== userId!) {
    throw new Error('You are not allowed to download somebody\'s invoice')
  }

  const { incomes, ...invoiceInfo }: IProject = project.toObject()

  invoiceInfo.invoiceDate = format(new Date(invoiceInfo.invoiceDate), 'dd-MM-YYYY')

  return {
    invoice: {
      invoiceInfo: {
        invoiceDate: project.invoiceDate,
        invoiceNumber: project.invoiceNumber,
        invoiceTitle: project.name,
      },
      sender: {
        name: `${user.firstName} ${user.lastName}`,
        address: {
          city: user.city || '',
          postalCode: user.postalCode || '',
          streetAddress: user.streetAddress || '',
          country: 'the Netherlands', // TODO: add country field to user
        },
        btw: user.btw || '',
        iban: user.iban || '',
        email: user.email,
        phone: user.phone || '',
        kvk: user.kvk || '',
      },
      items: project.incomes.map(v => {
        return {
          name: v.name || '',
          price: (v.price && v.price.toString()) || '',
          quantity: v.quantity || 0,
          taxRate: (v.taxRate && v.taxRate.toString()) || '',
        }
      }),
      receiver: {
        name: `${client.firstName} ${client.lastName}`,
        email: client.email || '',
        address: {
          streetAddress: client.streetAddress || '',
          city: client.city || '',
          country: 'the Netherlands',
          postalCode: client.postalCode || '', // TODO: add country field to client
        },
      },
    },
    key: `${`${client.firstName} ${client.lastName || ''}`.trim()}/${project.invoiceDate}/invoice-${
      project.invoiceNumber
    }.pdf`,
  }
}
