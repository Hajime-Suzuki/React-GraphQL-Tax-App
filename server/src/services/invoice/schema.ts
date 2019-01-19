import { gql } from 'apollo-server-koa'

export const invoiceSchema = gql`
  type Mutation {
    downloadInvoice(projectId: String!): GenerateInvoiceResponse
  }

  type GenerateInvoiceResponse {
    message: String
    data: Blob
  }

  scalar Blob
`
