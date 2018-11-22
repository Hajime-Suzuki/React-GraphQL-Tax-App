import * as dotenv from 'dotenv'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as cors from 'koa-cors'
import * as Router from 'koa-router'
import passport from './passport/passport'
import expenseRoutes from './routes/expense'
import loginRoutes from './routes/login'
import projectRoutes from './routes/projects'
import usersRoutes from './routes/users'
import server from './server'

dotenv.config()

const app = new Koa()
const router = new Router()

app.use(cors())
app.use(bodyParser())
app.use(passport.initialize())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    console.log(new Date())
    console.log(e.message)
    ctx.status = e.status || 500
    ctx.body = e.message
  }
})

router.get('/', async ctx => {
  ctx.body = 'Tax App'
})

app.use(router.routes())
app.use(projectRoutes.routes())
app.use(usersRoutes.routes())
app.use(expenseRoutes.routes())
app.use(loginRoutes.routes())

server.applyMiddleware({ app })

export default app
