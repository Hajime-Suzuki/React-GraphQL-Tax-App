import { gql } from 'apollo-server-koa'

export const userExpenseSchema = gql`
  type UserExpense {
    name: String!
    price: String!
    quantity: Int!
    taxRate: Int!
    date: String!
    user: String!
  }

  type Query {
    getUserExpenses: [UserExpense!]
  }

  type Mutation {
    addUserExpense(data: UserExpenseInput!): AddUserExpensesResponse!
  }

  input UserExpenseInput {
    name: String!
    price: String!
    quantity: Int!
    taxRate: Int!
    date: String!
  }

  type AddUserExpensesResponse {
    message: String
    userExpense: UserExpense
  }
`
