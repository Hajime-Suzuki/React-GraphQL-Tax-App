import gql from 'graphql-tag'

export const GET_USER_ID = gql`
  query getToken {
    userId @client
  }
`
export const LOGOUT = gql`
  mutation logout {
    logout @client
  }
`
