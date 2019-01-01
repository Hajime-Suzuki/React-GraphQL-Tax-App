import { gql } from 'apollo-server-koa'

export const userSchema = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    projects: [Project!]
    expenses: [Expense!]
    clients: [Client!]
    btw: String
    kvk: String
    iban: String
    phone: String
    streetAddress: String
    postalCode: String
    city: String
    createdAt: Date
    updatedAt: Date
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    password: String
    btw: String
    kvk: String
    iban: String
    streetAddress: String
    postalCode: String
    city: String
  }

  type Query {
    getUser(id: String!): User!
  }

  type Mutation {
    registerUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): RegisterResponse!
    loginUser(email: String!, password: String!): RegisterResponse!
    updateUser(data: UpdateUserInput!): updateUserResponse!
  }

  type RegisterResponse {
    success: Boolean!
    message: String
    token: String!
  }
  type updateUserResponse {
    message: String
    user: User!
  }
`
