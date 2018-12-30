import * as Router from 'koa-router'
import { Constants } from '../constants'
import { authMiddleware } from '../passport/passport'
import { PDF } from '../pdf/generatePDF'
const router = new Router({ prefix: '/invoice' })

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
