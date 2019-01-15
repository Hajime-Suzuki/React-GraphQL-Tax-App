import * as Router from 'koa-router'
import { Constants } from '../constants'
import { authMiddleware } from '../passport/passport'
import { PDFDomain } from '../services/pdf/domain'

const router = new Router({ prefix: '/invoice' })

router.get('/render', authMiddleware, async ctx => {
  const userId = (ctx as any).req.user.id
  const data = await PDFDomain.getAllDataForInvoice(ctx.query.projectId, userId)
  const config = {
    publicPath: Constants.BASE_URL,
    ...data
  }
  ctx.render('./src/index', config)
})

export default router
