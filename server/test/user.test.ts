import 'jest'
import * as supertest from 'supertest'
import app from '../src/app'
import dbConnection from '../src/database/connection'
import { IUser, User } from '../src/Models/User'

let server
let request

beforeAll(async () => {
  server = await app.listen(5000, () => {
    dbConnection.then(() => console.log('DB')).catch(e => console.log(e))
  })
  request = supertest(server)
  await User.deleteMany({})
})

const userData = {
  firstName: 'first',
  lastName: 'last',
  email: 'test@test.com',
  password: 'password'
}

describe('---- USER ----', () => {
  test('can add a new user', async () => {
    const user: IUser = await request
      .post('/users')
      .send(userData)
      .expect(201)
      .then(({ body }) => body)

    expect(user.firstName).toBe('first')
  })

  test('cannot add a user with duplicate email', async () => {
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

    expect(res.error.text).toBe('User validation failed: email: invalid email')
  })

  test('cannot add a user with short password', async () => {
    const newUserData = {
      ...userData,
      email: 'newEmail@email.com',
      password: 'p'
    }

    const res = await request
      .post('/users')
      .send(newUserData)
      .expect(500)

    expect(res.error.text).toBe('password is too short')
  })
})
