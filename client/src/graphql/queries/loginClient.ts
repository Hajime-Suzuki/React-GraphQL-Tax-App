import gql from 'graphql-tag'

export const GET_USER_ID = gql`
  query getToken {
    userId @client
  }
`
