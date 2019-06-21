import { gql } from 'apollo-server-koa'

export const userExpenseSchema = gql`
  type UserExpense {
    id: ID!
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
    addUserExpense(data: UserExpenseInput!): MutationUserExpensesResponse!
    updateUserExpense(
      id: ID!
      data: UpdateUserExpenseInput!
    ): MutationUserExpensesResponse!
  }

  input UserExpenseInput {
    name: String!
    price: String!
    quantity: Int!
    taxRate: Int!
    date: String!
  }

  input UpdateUserExpenseInput {
    name: String
    price: String
    quantity: Int
    taxRate: Int
    date: String
  }

  type MutationUserExpensesResponse {
    message: String
    userExpense: UserExpense
  }
`
