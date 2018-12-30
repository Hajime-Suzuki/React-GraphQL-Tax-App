import * as Router from 'koa-router'
import { Constants } from '../constants'
import { getInvoicePDF, PDF } from '../pdf/generatePDF'
import { authMiddleware } from '../passport/passport'
const router = new Router({ prefix: '/invoice' })

// router.get('/generate', async ctx => {
//   const projectId = ctx.query.projectId
//   const userId = ctx.query.userId
//   try {
//     const pdf = await PDF.generatePDF(projectId, userId)
//     ctx.response.attachment('invoice.pdf')
//     ctx.body = pdf
//   } catch (error) {
//     console.log(error)
//     return error
//   }
// })

router.get('/render', authMiddleware, async ctx => {
  const userId = (ctx as any).req.user.id
  const data = await PDF.getAllDataForInvoice(ctx.query.projectId, userId)

  const config = {
    publicPath: Constants.BASE_URL,
    ...data
  }
  ctx.render('./src/index', config)
})

export default router
