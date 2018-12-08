import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`

export const GET_USER = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      firstName
      lastName
      email
    }
  }
`
