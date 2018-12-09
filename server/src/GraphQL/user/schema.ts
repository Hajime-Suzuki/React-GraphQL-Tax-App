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
    getUser(id: String!): User
  }

  type Mutation {
    registerUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): RegisterResponse!
    loginUser(email: String!, password: String!): RegisterResponse!
  }
  type RegisterResponse {
    success: Boolean!
    message: String
    token: String!
  }
`
