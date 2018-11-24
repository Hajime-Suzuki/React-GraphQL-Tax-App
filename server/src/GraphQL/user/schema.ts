import { gql } from 'apollo-server-koa'

export const userSchema = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    projects: [Project!]
    expenses: [Expense!]
  }
  type Query {
    getUser(id: String!): User!
  }
`
