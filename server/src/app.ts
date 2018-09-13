import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as Router from 'koa-router'
import passport from './passport/passport'
import loginRoutes from './routes/login'
import projectRoutes from './routes/projects'
import usersRoutes from './routes/users'
const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(passport.initialize())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (e) {
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
app.use(loginRoutes.routes())

export default app
