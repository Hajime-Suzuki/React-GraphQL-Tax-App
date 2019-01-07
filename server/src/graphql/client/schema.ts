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
    client: Client
  }
  type Query {
    getClientsByUser: [Client!]
    getClientByProject(projectId: String!): Client
    getSingleClient(clientId: String!): Client
  }
  type Mutation {
    addClient(data: ClientInput!): ClientMutationResponse
    updateClient(clientId: String!, data: ClientInput!): ClientMutationResponse
    updateClientProject(
      projectId: String!
      clientId: String
    ): ClientMutationResponse
    deleteClient(clientId: String!): ClientMutationResponse
  }
`
