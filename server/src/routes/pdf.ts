import * as Router from 'koa-router'
import { Constants } from '../constants'
import { authMiddleware } from '../passport/passport'
import { InvoiceQueries } from '../services/invoice/queries'

const router = new Router({ prefix: '/invoice' })

router.get('/render', authMiddleware, async ctx => {
  const userId = (ctx as any).req.user.id
  const data = await InvoiceQueries.getAllDataForInvoice(
    ctx.query.projectId,
    userId
  )
  const config = {
    publicPath: Constants.BASE_URL,
    ...data
  }
  ctx.render('../services/invoice/src/index.pug', config)
})

export default router
