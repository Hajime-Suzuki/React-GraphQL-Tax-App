import * as Router from 'koa-router'
import { IUser, User } from '../Models/User'
import { authMiddleware } from '../passport/passport'

const usersRoutes = new Router({
  prefix: '/users'
})

usersRoutes.post('/', async ctx => {
  const body = ctx.request.body
  const newUser = await new User(body).save()
  const { password, ...rest } = newUser.toObject()

  ctx.status = 201
  ctx.body = { user: rest, jwt: newUser.generateToken() }
})

usersRoutes.get('/:id', authMiddleware, async ctx => {
  const user = await User.findById(ctx.params.id).populate({
    path: 'projects',
    options: { sort: { date: -1 } }
  })

  if (!user) return ctx.throw(404, 'user not found')

  ctx.status = 200
  ctx.body = { user }
})

export default usersRoutes
