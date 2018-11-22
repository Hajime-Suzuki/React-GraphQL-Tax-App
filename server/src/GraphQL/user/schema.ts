import { gql } from 'apollo-server-koa'

const UserSchema = gql`
  type User {
    _id: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    projects: [Project]
    expenses: IExpense[]
  }
`
