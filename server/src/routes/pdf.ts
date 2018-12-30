import * as Router from 'koa-router'
import { generatePDF } from '../pdf/generatePDF'
import { Constants } from '../constants'

const router = new Router({ prefix: '/invoice' })

// router.get('/download', ctx => {
//   ctx.response.attachment('./test.pdf')
//   ctx.body = fs.readFileSync(path.join(__dirname, '../document.pdf'))
// })

router.get('/generate', async ctx => {
  const projectId = ctx.query.projectId
  try {
    const pdf = await generatePDF(projectId)
    ctx.response.attachment('invoice.pdf')
    ctx.body = pdf
  } catch (error) {
    console.log(error)
    return error
  }
})

router.get('/render', async ctx => {
  console.log(ctx.query.projectId)
  const config = {
    publicPath: Constants.BASE_URL,
    test: {
      title: 'TEST!',
      name: 'Hajime'
    }
  }
  ctx.render('./src/index', config)
})

export default router
