import * as Router from 'koa-router'
import { Expense } from '../Models/Expense'
import { authMiddleware, IJwtPayload } from '../passport/passport'

const expenseRouter = new Router({ prefix: '/expenses' })

interface IExpensePayload {
  name: string
  price: number
  taxRate: 0 | 6 | 21
  date: Date
}

expenseRouter.post('/', authMiddleware, async ctx => {
  const jwtPayload: IJwtPayload = (ctx.req as any).user
  const userId = jwtPayload.id
  const data = ctx.request.body as IExpensePayload

  const expense = await Expense.create({ ...data, user: userId })

  ctx.status = 201
  ctx.body = { expense }
})

export default expenseRouter
