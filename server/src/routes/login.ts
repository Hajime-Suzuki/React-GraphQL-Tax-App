import * as Router from 'koa-router'
import { IUserDocument } from '../Models/User'
import passport from '../passport/passport'

const usersRoutes = new Router({
  prefix: '/login'
})

usersRoutes.post(
  '/',
  passport.authenticate('local', { session: false }),
  (ctx: any) => {
    const user: IUserDocument = ctx.req.user
    ctx.body = { jwt: user.generateToken() }
  }
)

export default usersRoutes
