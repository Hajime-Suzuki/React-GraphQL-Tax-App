import { gql } from 'apollo-server-koa'

const contactPerson = gql`
  type ContactPerson {
    firstName: String
    lastName: String
    email: String
    phone: String
    link: String
  }
`
