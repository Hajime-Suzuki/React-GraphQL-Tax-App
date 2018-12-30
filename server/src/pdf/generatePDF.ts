import * as puppeteer from 'puppeteer'

export const generatePDF = async (projectId: string) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(
    `http://localhost:4000/invoice/render?projectId=${projectId}`,
    {
      waitUntil: 'networkidle0'
    }
  )
  const buffer = await page.pdf({
    path: `${__dirname}/generated/test.pdf`,
    format: 'A4'
    // displayHeaderFooter: true,
    // headerTemplate: '<span></span>',
    // footerTemplate: `<div style="
    //   font-size:10px;
    //   color: #535353;
    //   width:230mm;
    //   text-align: center;
    // ">
    //   <span class="pageNumber"></span>/<span class="totalPages"></span>
    //   </div>`
  })
  await browser.close()
  return buffer
}
