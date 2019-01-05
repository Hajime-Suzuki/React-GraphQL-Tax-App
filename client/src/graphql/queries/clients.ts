import gql from 'graphql-tag'
import { Fragments } from '../fragments/fragments'

const GET_CLIENTS_BY_USER = gql`
  query getClientsList {
    getClientsByUser {
      ...ClientFragment
    }
  }
  ${Fragments.CLIENT_FRAGMENT}
`

const GET_SINGLE_CLIENT = gql`
  query singleClient($id: String!) {
    getSingleClient(clientId: $id) {
      ...ClientFragment
      streetAddress
      postalCode
      city
    }
  }
  ${Fragments.CLIENT_FRAGMENT}
`
const EDIT_CLIENT = gql`
  mutation updateClient($clientId: String!, $data: ClientInput!) {
    updateClient(clientId: $clientId, data: $data) {
      message
      client {
        ...ClientFragment
        streetAddress
        postalCode
        city
      }
    }
  }
  ${Fragments.CLIENT_FRAGMENT}
`

export const ClientQueries = {
  GET_CLIENTS_BY_USER,
  GET_SINGLE_CLIENT,
  EDIT_CLIENT
}
