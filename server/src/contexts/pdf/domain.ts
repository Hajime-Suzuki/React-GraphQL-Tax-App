import { format } from 'date-fns'
import * as puppeteer from 'puppeteer'
import { ProjectRepository } from '../project/repository'
import { UserRepository } from '../user/repository'
import { ClientRepository } from '../client/repository'
import { IProject } from '../@types/types'
import { Calculations } from '../../helpers/calculation'
import { Constants } from '../../constants'

export const getInvoicePDF = async (projectId: string, token: string) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.setExtraHTTPHeaders({ authorization: token })
  await page.goto(
    `${Constants.BASE_URL}/invoice/render?projectId=${projectId}`,
    {
      waitUntil: 'networkidle0'
    }
  )

  const buffer = await page.pdf({
    path: `${__dirname}/generated/invoice_${projectId}.pdf`,
    format: 'A4'
  })
  await browser.close()
  return buffer
}

export const getAllDataForInvoice = async (
  projectId: string,
  userId: string
) => {
  const project = await ProjectRepository.getById(projectId)
  if (!project) throw new Error('project not found')

  const user = await UserRepository.getById(project.user)
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
  invoiceInfo.invoiceDate = format(invoiceInfo.invoiceDate, 'dd-MM-YYYY')

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

export const PDFDomain = {
  getInvoicePDF,
  getAllDataForInvoice
}
