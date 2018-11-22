import { gql } from 'apollo-server-koa'

const expense = gql`
  type Expense {
    name: String
    price: Int
    quantity: Int
    taxRate: Int # 0 | 6 | 21
    date: String
    user: User
  }
`
