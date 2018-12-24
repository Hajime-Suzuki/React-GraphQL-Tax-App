import gql from 'graphql-tag'

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`

const GET_USER = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
      firstName
      lastName
      email
    }
  }
`

export const loginQueries = {
  LOGIN_MUTATION,
  GET_USER
}
