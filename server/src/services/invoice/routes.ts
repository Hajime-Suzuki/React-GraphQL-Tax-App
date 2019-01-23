import * as Router from 'koa-router'
import { Constants } from '../../constants'
import { authMiddleware } from '../../passport/passport'
import { InvoiceQueries } from './queries'

const routes = new Router({ prefix: '/invoice' })

routes.get('/render', authMiddleware, async ctx => {
  const userId = (ctx as any).req.user.id
  const data = await InvoiceQueries.getAllDataForInvoice(
    ctx.query.projectId,
    userId
  )
  const config = {
    publicPath: Constants.BASE_URL,
    ...data
  }
  ctx.render('./src/index.pug', config)
})

export default routes
