import { User } from '../src/Models/User'
import { graphqlTestCall, startServer } from './server'
import { gql } from 'apollo-server-koa'
import { print } from 'graphql'
import {
  IRegisterResponse,
  IUser,
  IUpdateUserResponse
} from '../src/GraphQL/@types/types'
import { getUserById } from '../src/GraphQL/user/methods'

let connection: any

beforeAll(async () => {
  connection = await startServer()
  await User.remove({})
})
afterAll(async () => {
  await connection.close()
})

const createUserAndGetToken = async (userData: any) => {
  const user = await User.create(userData)
  return { user, token: user.generateToken() }
}
describe('Resolvers', async () => {
  const registerMutation = print(gql`
    mutation register(
      $firstName: String!
      $lastName: String!
      $email: String!
      $password: String!
    ) {
      registerUser(
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      ) {
        token
      }
    }
  `)
  // const getUserQuery = print(gql`
  //   {
  //     getUser {
  //       firstName
  //       lastName
  //       email
  //     }
  //   }
  // `)
  const userData = {
    firstName: 'test',
    lastName: 'user',
    email: 'test@test.com',
    password: '12345678'
  }

  describe('========== Register ==========', () => {
    test('can register user', async () => {
      const res = await graphqlTestCall<{ registerUser: IRegisterResponse }>(
        registerMutation,
        userData
      )

      expect(res).toHaveProperty(['data', 'registerUser', 'token'])
    })

    test('can\'t register with same email', async () => {
      const res = await graphqlTestCall<{
        registerMutation: IRegisterResponse
      }>(registerMutation, userData)
      expect(res.errors![0].message).not.toBeNull()
    })
  })

  describe('========== Login User =========', async () => {
    const loginMutation = print(gql`
      mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
          token
        }
      }
    `)

    test('can login', async () => {
      const res = await graphqlTestCall<{ loginUser: IRegisterResponse }>(
        loginMutation,
        {
          email: userData.email,
          password: userData.password
        }
      )
      expect(res.data).toBeDefined()
      expect(res.data!.loginUser.token).toBeDefined()
    })

    // test('can login', async () => {
    //   const res = await graphqlTestCall<IRegisterResponse>(loginMutation, {
    //     email: user.email,
    //     password: user.password
    //   })
    //   expect(res.data).toBeDefined()
    //   expect(res.data!.token).not.toBeNull()
    // })
  })

  describe.only('========== Update User =========', async () => {
    const updateMutation = print(gql`
      mutation updateUser($data: UpdateUserInput!) {
        updateUser(data: $data) {
          user {
            id
            firstName
            lastName
            email
          }
        }
      }
    `)

    test('can update', async () => {
      const userData2 = {
        ...userData,
        email: '123413241234123413@testiaashiet.com'
      }
      const { user } = await createUserAndGetToken(userData2)
      const res = await graphqlTestCall<{ updateUser: IUpdateUserResponse }>(
        updateMutation,
        {
          data: {
            firstName: '1234',
            lastName: '1234'
          }
        },
        { user }
      )

      expect(res.data).toBeDefined()
      expect(res.data!.updateUser.user.firstName).toBe('1234')
      expect(res.data!.updateUser.user.lastName).toBe('1234')
      expect(res.data!.updateUser.user.email).toBe(userData2.email)
    })
  })
})
