import * as Router from 'koa-router'
import * as fs from 'fs'
import * as path from 'path'
import { generatePDF } from '../pdf/generatePDF'

const router = new Router({ prefix: '/pdf' })

// router.get('/download', ctx => {
//   ctx.response.attachment('./test.pdf')
//   ctx.body = fs.readFileSync(path.join(__dirname, '../document.pdf'))
// })

router.get('/', async ctx => {
  try {
    const pdf = await generatePDF()
    ctx.response.attachment('pdf-item.pdf')
    ctx.body = pdf
  } catch (error) {
    console.log(error)
    return error
  }
})

router.get('/invoice', async ctx => {
  ctx.render('index')
})

export default router
