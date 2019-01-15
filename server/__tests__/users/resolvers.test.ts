import { gql } from 'apollo-server-koa'
import { print } from 'graphql'
import {
  IRegisterResponse,
  IUpdateUserResponse
} from '../../src/services/@types/types'
import { graphqlTestCallCreator } from '../helper'

describe('--------- Resolvers ---------', async () => {
  const userData = {
    firstName: 'test',
    lastName: 'user',
    email: 'test@test.com',
    password: '12345678'
  }

  describe('--------- Register ---------', () => {
    const mocks = {
      RegisterResponse: () => ({ token: 'ashiteonahs' })
    }
    const gqlTestCall = graphqlTestCallCreator(mocks)

    test('can register user', async () => {
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

      const res = await gqlTestCall<{
        registerUser: IRegisterResponse
      }>(registerMutation, userData)
      expect(res.data).toBeDefined()
      expect(res.data!.registerUser.token).toBeDefined()
    })
  })

  describe('--------- Login User ---------', async () => {
    const mocks = {
      RegisterResponse: () => ({ token: 'ashiteonahs' })
    }
    const gqlTestCall = graphqlTestCallCreator(mocks)

    const loginMutation = print(gql`
      mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
          token
        }
      }
    `)

    test('can login', async () => {
      const res = await gqlTestCall<{ loginUser: IRegisterResponse }>(
        loginMutation,
        {
          email: userData.email,
          password: userData.password
        }
      )
      expect(res.data).toBeDefined()
      expect(res.data!.loginUser.token).toBeDefined()
    })
  })

  describe('--------- Update User ---------', async () => {
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

    test('can update user', async () => {
      const updatedUserData = {
        firstName: '1234',
        lastName: '1234'
      }

      const mocks = {
        UpdateUserResponse: () => ({
          user: () => ({ ...userData, ...updatedUserData })
        })
      }
      const gqlTestCall = graphqlTestCallCreator(mocks)

      const res = await gqlTestCall<{ updateUser: IUpdateUserResponse }>(
        updateMutation,
        { data: updatedUserData }
      )

      expect(res.data).toBeDefined()
      expect(res.data!.updateUser.user.firstName).toBe('1234')
      expect(res.data!.updateUser.user.lastName).toBe('1234')
      expect(res.data!.updateUser.user.email).toBe('test@test.com')
    })
  })
})
