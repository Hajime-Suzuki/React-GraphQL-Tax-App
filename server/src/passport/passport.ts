import * as passport from 'koa-passport'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { Strategy as localStrategy } from 'passport-local'
import { secret } from '../jwt/jwt'
import { UserRepository } from '../contexts/user/repository'

export interface IJwtPayload {
  id: string
  iat: number
  exp: number
}

passport.use(
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      const user = await UserRepository.findByCondition(
        { email },
        { password: true }
      )

      if (!user) {
        return done({ message: 'incorrect username / password' })
      }

      if (!(await user.comparePassword(password))) {
        return done({ message: 'incorrect username / password' })
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
    (user: IJwtPayload, done) => done(null, user)
  )
)

export const authMiddleware = passport.authenticate('jwt', { session: false })

export default passport
