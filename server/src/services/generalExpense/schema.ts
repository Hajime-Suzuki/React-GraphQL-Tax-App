import { gql } from 'apollo-server-koa'

export const generalExpenseSchema = gql`
  type GeneralExpense {
    name: String!
    price: String!
    quantity: Int!
    taxRate: Int!
    date: String!
    user: String!
  }

  type Query {
    getGeneralExpenses: [GeneralExpense!]
  }

  type Mutation {
    addGeneralExpense(data: GeneralExpenseInput!): AddGeneralExpensesResponse!
  }

  input GeneralExpenseInput {
    name: String!
    price: String!
    quantity: Int!
    taxRate: Int!
    date: String!
  }

  type AddGeneralExpensesResponse {
    message: String
    generalExpense: GeneralExpense
  }
`
