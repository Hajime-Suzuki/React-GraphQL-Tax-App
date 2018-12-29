import * as puppeteer from 'puppeteer'

export const generatePDF = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:4000/pdf/invoice')
  const buffer = await page.pdf({
    path: `${__dirname}/pdf-files/test.pdf`,
    format: 'A4'
  })
  await browser.close()
  return buffer
}
