import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as Router from 'koa-router'
import dbConnection from './Database/connection'
import projectRoutes from './routes/projects'
import users from './routes/users'

const app = new Koa()
const router = new Router()

app.use(bodyParser())
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
app.use(users.routes())

app.listen(4000, () => {
  console.log('server is on 4000')
  dbConnection.then(() => console.log('DB')).catch(e => console.log(e))
})
