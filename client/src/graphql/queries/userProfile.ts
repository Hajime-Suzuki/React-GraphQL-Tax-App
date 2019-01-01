import gql from 'graphql-tag'

const USER_FRAGMENTS = gql`
  fragment UserFragments on User {
    id
    firstName
    lastName
    clients {
      id
      firstName
      lastName
      email
      phone
      streetAddress
      postalCode
      city
    }
    btw
    kvk
    iban
    streetAddress
    postalCode
    city
  }
`
const UPDATE_USER_PROFILE = gql`
  mutation updateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      message
      user {
        ...UserFragments
      }
    }
  }
  ${USER_FRAGMENTS}
`

const GET_USER_PROFILE = gql`
  query getUserProfile($id: String!) {
    getUser(id: $id) {
      ...UserFragments
    }
  }
  ${USER_FRAGMENTS}
`

export const userProfile = {
  USER_FRAGMENTS,
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE
}
