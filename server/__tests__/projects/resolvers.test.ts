import { gql } from 'apollo-server-koa'
import { print } from 'graphql'
import {
  IClientInput,
  IInvoiceStatus,
  IMutationProjectResponse,
  IProjectInput
} from '../../src/services/@types/types'
import { User } from '../../src/services/user/model'
import { graphqlTestCallCreator } from '../helper'

describe('================= Project Resolvers =================', async () => {
  const user = new User({
    firstName: '123',
    lastName: '1234',
    email: 'a@a.com'
  })

  describe('--------- addProject ---------', () => {
    const projectData: IProjectInput = {
      name: 'test',
      incomes: [{ name: 'income1', price: '12.22', quantity: 3, taxRate: 21 }],
      expenses: [{ name: 'expense1', price: '9.97', quantity: 1, taxRate: 6 }],
      invoiceDate: new Date().toDateString(),
      projectDate: new Date().toDateString(),
      status: IInvoiceStatus.Invoice
    }
    const clientData: IClientInput = {
      firstName: 'first name',
      lastName: 'last name',
      email: 'email',
      city: 'city',
      postalCode: 'a234',
      streetAddress: 'street',
      phone: '1234-1243-1234'
    }

    const projectReturn = { id: '1235', ...projectData }
    const clientReturn = { id: '1234', ...clientData }
    const mocks = {
      MutationProjectResponse: () => {
        return {
          success: true,
          project: projectReturn,
          client: clientReturn
        }
      }
    }

    const gqlTestCall = graphqlTestCallCreator(mocks)

    test('can add Project user', async () => {
      const addProjectMutation = print(gql`
        mutation addProject($data: ProjectInput!) {
          addProject(data: $data) {
            success
            project {
              id
              name
              invoiceDate
              projectDate
              status
            }
            client {
              id
              firstName
              lastName
            }
          }
        }
      `)

      const res = await gqlTestCall<{
        addProject: IMutationProjectResponse;
      }>(addProjectMutation, { data: projectData })

      expect(res.data).toBeDefined()
      expect(res.data!.addProject.success).toBe(true)
    })
  })

  // describe('--------- Login User ---------', async () => {
  //   const mocks = {
  //     RegisterResponse: () => ({ token: 'ashiteonahs' })
  //   }
  //   const gqlTestCall = graphqlTestCallCreator(mocks)

  //   const loginMutation = print(gql`
  //     mutation loginUser($email: String!, $password: String!) {
  //       loginUser(email: $email, password: $password) {
  //         token
  //       }
  //     }
  //   `)

  //   test('can login', async () => {
  //     const res = await gqlTestCall<{ loginUser: IRegisterResponse }>(
  //       loginMutation,
  //       {
  //         email: userData.email,
  //         password: userData.password
  //       }
  //     )
  //     expect(res.data).toBeDefined()
  //     expect(res.data!.loginUser.token).toBeDefined()
  //   })
  // })

  // describe('--------- Update User ---------', async () => {
  //   const updateMutation = print(gql`
  //     mutation updateUser($data: UpdateUserInput!) {
  //       updateUser(data: $data) {
  //         user {
  //           id
  //           firstName
  //           lastName
  //           email
  //         }
  //       }
  //     }
  //   `)

  //   test('can update user', async () => {
  //     const updatedUserData = {
  //       firstName: '1234',
  //       lastName: '1234'
  //     }

  //     const mocks = {
  //       UpdateUserResponse: () => ({
  //         user: () => ({ ...userData, ...updatedUserData })
  //       })
  //     }
  //     const gqlTestCall = graphqlTestCallCreator(mocks)

  //     const res = await gqlTestCall<{ updateUser: IUpdateUserResponse }>(
  //       updateMutation,
  //       { data: updatedUserData }
  //     )

  //     expect(res.data).toBeDefined()
  //     expect(res.data!.updateUser.user.firstName).toBe('1234')
  //     expect(res.data!.updateUser.user.lastName).toBe('1234')
  //     expect(res.data!.updateUser.user.email).toBe('test@test.com')
  //   })
  // })
})
