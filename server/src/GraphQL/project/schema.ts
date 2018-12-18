import { gql } from 'apollo-server-koa'

export const projectSchema = gql`
  type Project {
    id: String!
    invoiceNumber: String!
    invoiceDate: String
    name: String!
    date: Date
    streetAddress: String
    city: String
    link: String
    status: INVOICE_STATUS!
    client: Client
    user: String!
    expenses: [ExpenseAndIncome!]
    incomes: [ExpenseAndIncome!]
  }

  type Query {
    getProjectsByUserId(userId: String!): [Project!]!
  }

  type Mutation {
    updateProject(
      projectId: String!
      data: UpdateProjectInput!
    ): MutationProjectResponse!
    addProject(data: AddProjectInput!): MutationProjectResponse
  }

  type MutationProjectResponse {
    success: Boolean!
    message: String
    project: Project
  }

  input UpdateProjectInput {
    status: INVOICE_STATUS!
  }

  input AddProjectInput {
    invoiceNumber: String
    invoiceDate: String
    projectDate: String
    name: String
    date: String
    status: INVOICE_STATUS
    client: ClientInput
    expenses: [ExpenseAndIncomeInput!]
    incomes: [ExpenseAndIncomeInput!]
  }

  scalar Date
`