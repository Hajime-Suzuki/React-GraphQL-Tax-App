import { gql } from 'apollo-server-koa'

export const clientSchema = gql`
  type Client {
    id: String!
    firstName: String
    lastName: String
    email: String
    phone: String
    postalCode: String
    address: String
    user: String
    projects: [String!]
  }
  input ClientInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    postalCode: String
    address: String
  }

  type Query {
    getClientsByUser(userId: String!): [Client!]
  }
`
