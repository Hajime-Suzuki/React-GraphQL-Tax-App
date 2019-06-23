import * as React from 'react'
import { WithApolloClient } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { LoginActions } from 'src/graphql/actions/login'
import {
  LoginComponent,
  LoginMutationFn,
  LoginMutationVariables
} from 'src/graphql/components/login'
import {
  SignUpComponent,
  SignUpMutationFn,
  SignUpMutationVariables
} from 'src/graphql/components/signup'
import { IRouterComponentProps } from 'src/routes/types'
import { RoutesNames } from '../../routes/route-names'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import {
  GetTokenProps,
  withGetToken
} from 'src/graphql/components/client/login'

type Props = WithApolloClient<GetTokenProps<IRouterComponentProps>>

export interface LoginSignupChildProps {
  signup?: (value: SignUpMutationVariables) => void
  login?: (values: LoginMutationVariables) => void
  loading: boolean
}

class LoginAndSignupFormContainer extends React.Component<Props> {
  render() {
    const path = this.props.location.pathname
    const { data: localData } = this.props

    if (localData!.userId) return <Redirect to={RoutesNames.dashboard} />
    return path === RoutesNames.login ? <this.LoginForm /> : <this.SignUpForm />
  }

  handleLogin = (login: LoginMutationFn) => async ({
    email,
    password
  }: LoginMutationVariables) => {
    const res = await login({ variables: { email, password } })
    const token = res && res.data && res.data.loginUser.token
    if (token) {
      LoginActions.onLogin(token)
    }
  }

  handleSignup = (signup: SignUpMutationFn) => async (
    value: SignUpMutationVariables
  ) => {
    const res = await signup({ variables: value })
    const token = res && res.data && res.data.registerUser.token
    if (token) {
      LoginActions.onLogin(token)
    }
  }

  SignUpForm = () => {
    return (
      <SignUpComponent>
        {(signup, { loading }) => {
          return (
            <SignupForm signup={this.handleSignup(signup)} loading={loading} />
          )
        }}
      </SignUpComponent>
    )
  }

  LoginForm = () => {
    return (
      <LoginComponent>
        {(login, { error, loading }) => {
          return (
            <div style={{ textAlign: 'center' }}>
              {error && <p>{error.message}</p>}
              <LoginForm login={this.handleLogin(login)} loading={loading} />
            </div>
          )
        }}
      </LoginComponent>
    )
  }
}

export default withGetToken<Props>({})(LoginAndSignupFormContainer)
