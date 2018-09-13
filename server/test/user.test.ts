import 'jest'
import * as jwt from 'jsonwebtoken'
import * as supertest from 'supertest'

import app from '../src/app'
import dbConnection from '../src/database/connection'
import { secret } from '../src/jwt/jwt'
import { IUser, User } from '../src/Models/User'

let server
let request

beforeAll(async () => {
  server = await app.listen(5000, () => {
    dbConnection.then(() => console.log('DB')).catch(e => console.log(e))
  })
  request = supertest(server)
})
beforeEach(async () => {
  await User.deleteMany({})
})

const userData = {
  firstName: 'first',
  lastName: 'last',
  email: 'test@test.com',
  password: 'password'
}

describe.only('---- USER ----', () => {
  describe('---- USER CREATE ----', () => {
    test('can add a new user correctly', async () => {
      const user: IUser = await request
        .post('/users')
        .send(userData)
        .expect(201)
        .then(({ body }) => body)

      expect(user.firstName).toBe('first')
      expect(user.password).not.toBe('password')
    })

    test('cannot add a user with duplicate email', async () => {
      await User.create(userData)
      const res = await request
        .post('/users')
        .send(userData)
        .expect(500)

      expect(res.error.text).toBe('email is already taken')
    })

    test('cannot add a user with invalid email', async () => {
      const res = await request
        .post('/users')
        .send({ ...userData, email: 'ahsitoe' })
        .expect(500)

      expect(res.error.text).toBe(
        'User validation failed: email: invalid email'
      )
    })

    test('cannot add a user with short password', async () => {
      const newUserData = {
        ...userData,
        password: 'p'
      }

      const res = await request
        .post('/users')
        .send(newUserData)
        .expect(500)

      expect(res.error.text).toBe('password is too short')
    })
  })

  describe('---- User Login ----', () => {
    test('can generate token', async () => {
      const user = await User.create(userData)
      const token = user.generateToken()
      expect(typeof token).toBe('string')
      const verifiedToken: any = jwt.verify(token, secret)
      expect(verifiedToken.id).toBe(user.id)
    })

    test('compare password', async () => {
      await User.create(userData)
      const user = await User.findOne({ email: userData.email }).select(
        '+password'
      )
      const isValidPassword = await user.comparePassword(userData.password)
      expect(isValidPassword).toBe(true)
    })

    test('get user by token', async () => {
      const newUser = await User.create(userData)
      const token = newUser.generateToken()
      const user = await User.findByToken(token)
      expect(user.firstName).toBe(userData.firstName)
    })
  })
})
