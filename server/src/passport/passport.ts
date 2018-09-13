import * as passport from 'koa-passport'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { Strategy as localStrategy } from 'passport-local'
import { secret } from '../jwt/jwt'
import { User } from '../Models/User'

passport.use(
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      const user = await User.findOne({ email }).select('+password')

      if (!user) return done('incorrect username / password')

      if (!user.comparePassword(password)) {
        return done('incorrect username / password')
      }

      return done(null, user)
    }
  )
)

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: secret
    },
    (jwtPayload, done) => done(null, { jwtPayload })
  )
)

export const authMiddleware = passport.authenticate('jwt', { session: false })

export default passport
