import gql from 'graphql-tag'

const CLIENT_FRAGMENT = gql`
  fragment ClientFragment on Client {
    id
    firstName
    lastName
    email
    phone
  }
`
const GET_CLIENTS_BY_USER = gql`
  query getClientsList {
    getClientsByUser {
      ...ClientFragment
    }
  }
  ${CLIENT_FRAGMENT}
`

const GET_SINGLE_CLIENT = gql`
  query singleClient {
    getSingleClient {
      ...ClientFragment
      streetAddress
      postalCode
      city
    }
  }
  ${CLIENT_FRAGMENT}
`

export const ClientQueries = {
  GET_CLIENTS_BY_USER,
  GET_SINGLE_CLIENT
}
