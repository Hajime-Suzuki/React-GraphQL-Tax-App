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
    contactPerson: ContactPerson
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
  }

  type MutationProjectResponse implements MutationResponse {
    success: Boolean!
    message: String
    project: Project
  }

  input UpdateProjectInput {
    status: INVOICE_STATUS!
  }

  scalar Date
`
