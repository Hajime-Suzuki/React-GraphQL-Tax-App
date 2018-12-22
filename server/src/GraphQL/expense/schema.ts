import { gql } from 'apollo-server-koa'

export const expenseSchema = gql`
  type Expense {
    name: String!
    price: String!
    quantity: Int!
    taxRate: Int! # 0 | 6 | 21
    date: String
    user: User
  }
  type ExpenseAndIncome {
    name: String!
    price: String!
    quantity: Int!
    taxRate: Int!
  }
  input ExpenseAndIncomeInput {
    name: String
    price: Int
    quantity: Int
    taxRate: Int
  }
`
