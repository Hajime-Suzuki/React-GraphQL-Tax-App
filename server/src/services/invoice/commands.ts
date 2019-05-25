import * as fs from 'fs'
import * as puppeteer from 'puppeteer'
import { Constants } from '../../constants'
const fsPromises = fs.promises

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

  const pdfFolder = `${__dirname}/generated`

  if (!fs.existsSync(pdfFolder)) await fsPromises.mkdir(pdfFolder)
  const pdfPath = `${pdfFolder}/invoice_${projectId}.pdf`

  const buffer = await page.pdf({
    path: pdfPath,
    format: 'A4'
  })

  await fsPromises.unlink(pdfPath)
  await browser.close()
  return buffer
}

export const InvoiceCommands = {
  getInvoicePDF
}
