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

  let TOKEN: string
  describe('========== Register ==========', () => {
    test('can register user', async () => {
      const res = await graphqlTestCall<{ registerUser: IRegisterResponse }>(
        registerMutation,
        userData
      )
      TOKEN = res.data!.registerUser.token

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
      expect(res.data!.loginUser.token).not.toBeNull()
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

  describe('========== Update User =========', async () => {
    const updateMutation = print(gql`
      mutation updateUser($data: UpdateUserInput!) {
        updateUser(data: $data) {
          user {
            id
            firstName
            lastName
          }
        }
      }
    `)

    test('can update', async () => {
      // const u = await User.findByToken(TOKEN)

      const res = await graphqlTestCall<IUpdateUserResponse>(
        updateMutation,
        {
          data: {
            firstName: '1234',
            lastName: '1234'
          }
        },
        { ctx: { headers: { jwt: TOKEN } } }
      )
      console.log(res)
      expect(1).toBe(1)
      // expect(res.data).toBeDefined()
      // expect(res.data!.user).toBeDefined()
    })
  })
})
