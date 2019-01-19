import { format } from 'date-fns'
import * as puppeteer from 'puppeteer'
import { ProjectRepository } from '../project/repository'
import { UserRepository } from '../user/repository'
import { ClientRepository } from '../client/repository'
import { IProject } from '../@types/types'
import { Calculations } from '../../helpers/calculation'
import { Constants } from '../../constants'
import * as fs from 'fs'

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

  const pdfPath = `${__dirname}/generated/invoice_${projectId}.pdf`
  const buffer = await page.pdf({
    path: pdfPath,
    format: 'A4'
  })
  fs.unlinkSync(pdfPath)
  await browser.close()
  return buffer
}

export const InvoiceCommands = {
  getInvoicePDF
}
