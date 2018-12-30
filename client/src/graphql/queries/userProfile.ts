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
// const EDIT_USER_PROFILE = gql`
//   mutation editUserProfile($id: String!, $data: EditUserInput!){

//   }
// `

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
  // EDIT_USER_PROFILE,
  GET_USER_PRIFILE: GET_USER_PROFILE
}
