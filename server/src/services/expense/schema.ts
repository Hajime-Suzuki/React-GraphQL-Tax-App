import { gql } from 'apollo-server-koa'

export const expenseSchema = gql`
  type Expense {
    name: String
    price: String
    quantity: Int
    taxRate: Int # 0 | 9 | 21
    date: String
  }
  type ExpenseAndIncome {
    name: String
    price: String
    quantity: Int
    taxRate: Int
  }
  input ExpenseAndIncomeInput {
    name: String
    price: String
    quantity: Int
    taxRate: Int
  }
`
