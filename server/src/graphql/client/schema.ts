import { gql } from 'apollo-server-koa'

export const clientSchema = gql`
  type Client {
    id: String!
    firstName: String
    lastName: String
    email: String
    phone: String
    user: String
    projects: [String!]
    streetAddress: String
    postalCode: String
    city: String
  }
  input ClientInput {
    id: String
    firstName: String
    lastName: String
    email: String
    phone: String
    streetAddress: String
    postalCode: String
    city: String
  }
  type ClientMutationResponse {
    message: String
    client: Client!
  }
  type Query {
    getClientsByUser: [Client!]
    getSingleClient(clientId: String!): Client
  }
  type Mutation {
    updateClient(clientId: String!, data: ClientInput!): ClientMutationResponse
  }
`
