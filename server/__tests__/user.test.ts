import { User } from '../src/Models/User'
import { graphqlTestCall, startServer } from './server'

let connection: any

beforeAll(async () => {
  connection = await startServer()
  await User.remove({})
})
afterAll(async () => {
  await connection.close()
})

const registerMutation = `
mutation register(
        $firstName: String!, $lastName: String!, $email: String!, $password: String!
      ) {
      registerUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
        token
      }
    }
  `

describe('Resolvers', async () => {
  const user = {
    firstName: 'test',
    lastName: 'user',
    email: 'test@test.com',
    password: '12345678'
  }

  test('Register user', async () => {
    const registerResponse = await graphqlTestCall(registerMutation, user)

    expect(registerResponse).toHaveProperty(['data', 'registerUser', 'token'])
  })

  test('can\'t register with same email', async () => {
    expect(graphqlTestCall(registerMutation, user)).resolves.toThrow()
  })
})
