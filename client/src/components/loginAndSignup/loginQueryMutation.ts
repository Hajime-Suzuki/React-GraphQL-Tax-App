import { Mutation, MutationFn, Query } from 'react-apollo'
import { LoginUserMutationArgs } from 'src/graphql/@types/types'
import gql from 'graphql-tag'
import { GetUserQueryArgs } from '../../graphql/@types/types.d'

interface LoginUserData {
  loginUser: {
    token: string
  }
}

export interface UserData {
  getUser?: {
    firstName
    lastName
  }
}

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

// export const GET_USER_ID = gql`
//   query getToken {
//     userId @client
//   }
// `

export type LoginFn = MutationFn<LoginUserData, LoginUserMutationArgs>
export class LoginMutation extends Mutation<
  LoginUserData,
  LoginUserMutationArgs
> {}

export class UserIdQuery extends Query<{ userId: string }> {}
export class GetUserQuery extends Query<UserData, GetUserQueryArgs> {}
