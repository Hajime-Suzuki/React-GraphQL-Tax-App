import * as Router from 'koa-router'
import { Project } from '../Models/Project'
import { User } from '../Models/User'
import { authMiddleware, IJwtPayload } from '../passport/passport'

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
  //  will replace with ctx.user.id
  const user = await User.findById(ctx.params.id).populate({
    path: 'projects',
    options: { sort: { date: -1 } },
    populate: { path: 'contactPerson' }
  })

  if (!user) return ctx.throw(404, 'user not found')

  ctx.status = 200
  ctx.body = { user }
})

// usersRoutes.get('/:id/dashboard', authMiddleware, async ctx => {
//   // wouldn't need :id?.

//   const jwtPayload: IJwtPayload = (ctx.req as any).user
//   const userId = jwtPayload.id

//   const user = await User.findById(userId).populate({
//     path: 'projects',
//     match: { date: { $gt: '2018-09-09' } },
//     options: { sort: { date: -1 } }
//   })
//   console.log(JSON.stringify(user!.projects, null, 2))

//   ctx.body = { user }
// })

export default usersRoutes
