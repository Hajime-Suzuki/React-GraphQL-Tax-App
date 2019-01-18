import { gql } from 'apollo-server-koa'
import { print } from 'graphql'
import {
  IClientInput,
  IInvoiceStatus,
  IMutationProjectResponse,
  IProjectInput,
  IProject
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

    test('can add project', async () => {
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

  describe('--------- updateProject ---------', () => {
    const projectData: IProjectInput = {
      name: 'test',
      incomes: [{ name: 'income1', price: '12.22', quantity: 3, taxRate: 21 }],
      expenses: [{ name: 'expense1', price: '9.97', quantity: 1, taxRate: 6 }],
      invoiceDate: new Date().toDateString(),
      projectDate: new Date().toDateString(),
      status: IInvoiceStatus.Invoice
    }

    const projectReturn = { id: '1235', ...projectData }
    const mocks = {
      MutationProjectResponse: () => {
        return {
          success: true,
          project: projectReturn
        }
      }
    }

    const gqlTestCall = graphqlTestCallCreator(mocks)

    test('can update project', async () => {
      const updateProjectMutation = print(gql`
        mutation updateProject($projectId: String!, $data: ProjectInput!) {
          updateProject(projectId: $projectId, data: $data) {
            success
            project {
              id
              name
              invoiceDate
              projectDate
              status
            }
          }
        }
      `)

      const res = await gqlTestCall<{
        updateProject: IMutationProjectResponse;
      }>(updateProjectMutation, { projectId: '12', data: projectData })
      expect(res.data).toBeDefined()
      expect(res.data!.updateProject.success).toBe(true)
      expect(res.data!.updateProject.project).toBeDefined()
    })
  })

  describe('--------- updateProject ---------', async () => {
    const deletedProject: IProject = {
      id: '1234',
      name: 'test',
      invoiceNumber: '1234',
      user: '1234',
      incomes: [{ name: 'income1', price: '12.22', quantity: 3, taxRate: 21 }],
      expenses: [{ name: 'expense1', price: '9.97', quantity: 1, taxRate: 6 }],
      invoiceDate: new Date().toDateString(),
      projectDate: new Date().toDateString(),
      status: IInvoiceStatus.Invoice
    }

    const deleteProjectMutation = print(gql`
      mutation deleteProject($projectId: String!) {
        deleteProject(projectId: $projectId) {
          success
          project {
            id
            name
            invoiceDate
            projectDate
            status
          }
        }
      }
    `)

    const mocks = {
      MutationProjectResponse: () => {
        return {
          success: true,
          project: deletedProject
        }
      }
    }

    const gqlTestCall = graphqlTestCallCreator(mocks)
    const res = await gqlTestCall<{ deleteProject: IMutationProjectResponse }>(
      deleteProjectMutation,
      {
        projectId: deletedProject.id
      }
    )
    expect(res.data).toBeDefined()
    expect(res.data!.deleteProject.project).toBeDefined()
    expect(res.data!.deleteProject.success).toBe(true)
    expect(res.data!.deleteProject.project).toMatchObject(deletedProject)
  })
})
