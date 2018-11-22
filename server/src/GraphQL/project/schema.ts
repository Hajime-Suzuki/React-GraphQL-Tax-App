import { gql } from 'apollo-server-koa'

const ProjectSchema = gql`
  type Project {
    invoiceNumber: String!
    inVoiceDate: String
    name: String!
    date: String
    streetAddress: String
    city: String
    link: String
    status: String #'none' | 'invoice' | 'paid'
    contactPerson?: IContactPerson
    user: User
    expenses: [IExpenseAndIncome]
    incomes: [IExpenseAndIncome]
  }
  type ExpenseAndIncome {
    name: String
    price: Int
    quantity: Int
    taxRate: Int # 0 | 6 | 21
  }
`
