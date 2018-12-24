import gql from 'graphql-tag'

const GET_USER_ID = gql`
  query getToken {
    userId @client
  }
`

export const loginClientQueries = {
  GET_USER_ID
}
