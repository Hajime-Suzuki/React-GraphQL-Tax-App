import { gql } from 'apollo-server-koa'

export const expenseSchema = gql`
  type GeneralExpense {
    name: String!
    price: String!
    quantity: Int!
    taxRate: Int!
    date: String!
    user: String!
  }
  type GeneralExpenseInput {
    name: String!
    price: String!
    quantity: Int!
    taxRate: Int!
    date: String!
  }
`
