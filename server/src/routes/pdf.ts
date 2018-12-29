import * as Router from 'koa-router'
import { generatePDF } from '../pdf/generatePDF'

const router = new Router({ prefix: '/invoice' })

// router.get('/download', ctx => {
//   ctx.response.attachment('./test.pdf')
//   ctx.body = fs.readFileSync(path.join(__dirname, '../document.pdf'))
// })

router.get('/generate', async ctx => {
  const projectId = ctx.query.projectId

  try {
    const pdf = await generatePDF()
    ctx.response.attachment('pdf-item.pdf')
    ctx.body = pdf
  } catch (error) {
    console.log(error)
    return error
  }
})

router.get('/render', async ctx => {
  const config = {
    test: {
      title: 'TEST!',
      name: 'Hajime'
    }
  }
  ctx.render('index')
})

export default router
