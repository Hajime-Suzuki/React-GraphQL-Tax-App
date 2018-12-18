import { gql } from 'apollo-server-koa'

export const sharedTypes = gql`
  enum INVOICE_STATUS {
    none
    invoice
    paid
  }
`