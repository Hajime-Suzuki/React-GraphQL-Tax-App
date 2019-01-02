import * as puppeteer from 'puppeteer'
import { Project } from '../Models/Project'
import { User } from '../Models/User'
import { Calculations } from '../helpers/calculation'
import { Client } from '../Models/Client'
import { IProject } from '../GraphQL/@types/types'
import { format } from 'date-fns'

export const getInvoicePDF = async (projectId: string, token: string) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.setExtraHTTPHeaders({ authorization: token })
  await page.goto(
    `http://localhost:4000/invoice/render?projectId=${projectId}`,
    {
      waitUntil: 'networkidle0'
    }
  )

  const buffer = await page.pdf({
    path: `${__dirname}/generated/test.pdf`,
    format: 'A4'
  })
  await browser.close()
  return buffer
}

export const getAllDataForInvoice = async (
  projectId: string,
  userId: string
) => {
  const project = await Project.findById(projectId).populate('client')
  if (!project) throw new Error('project not found')

  const user = await User.findById(project.user)
  if (!user) throw new Error('user not found')

  if (user.id !== userId!) {
    throw new Error('You are not allowed to download somebody\'s invoice')
  }

  const {
    projects: _,
    clients: __,
    expenses: ___,
    ...userInfo
  } = user.toObject()

  const { client, incomes, ...invoiceInfo }: IProject = project.toObject()
  invoiceInfo.invoiceDate = format(invoiceInfo.invoiceDate, 'dd-MM-YYYY')

  return {
    userInfo,
    invoiceInfo,
    clientInfo: project.client || {},
    incomes: incomes
      ? incomes.map(income => ({
          ...income,
          price: Calculations.format(income.price)
        }))
      : [],
    totalPrices: incomes ? Calculations.getGrandTotal(incomes) : 0
  }
}

export const PDF = {
  getInvoicePDF,
  getAllDataForInvoice
}
