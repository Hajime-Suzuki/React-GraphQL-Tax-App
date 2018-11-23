import { gql } from 'apollo-server-koa'

export const contactPersonSchema = gql`
  type ContactPerson {
    firstName: String
    lastName: String
    email: String
    phone: String
    link: String
  }
`
