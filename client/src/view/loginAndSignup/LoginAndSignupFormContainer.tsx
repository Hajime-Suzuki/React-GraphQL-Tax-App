import * as React from 'react'
import { MutationFn, WithApolloClient } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { LoginUserMutationArgs } from 'src/graphql/@types/resolvers'
import { LoginActions } from 'src/graphql/actions/login'
import { GetToken } from 'src/graphql/components/client/login'
import { Login } from 'src/graphql/components/login'
import { SignUp } from 'src/graphql/components/signup'
import { IRouterComponentProps } from 'src/routes/types'
import { RoutesNames } from '../../routes/constants'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

type Props = WithApolloClient<GetToken.Props<IRouterComponentProps>>

export interface LoginSignupChildProps {
  signup?: (value: SignUp.Variables) => void
  login?: (values: LoginUserMutationArgs) => void
  loading: boolean
}

class LoginAndSignupFormContainer extends React.Component<Props> {
  render() {
    const path = this.props.location.pathname
    const { data: localData } = this.props

    if (localData!.userId) return <Redirect to={RoutesNames.dashboard} />
    return path === RoutesNames.login ? (
      <this.LoginForm />
    ) : (
      <this.SignUpForm />
    )
  }

  handleLogin = (login: MutationFn<Login.Mutation, Login.Variables>) => async ({
    email,
    password
  }: LoginUserMutationArgs) => {
    const res = await login({ variables: { email, password } })
    const token = res && res.data && res.data.loginUser.token
    if (token) {
      LoginActions.onLogin(token)
    }
  }

  handleSignup = (
    signup: MutationFn<SignUp.Mutation, SignUp.Variables>
  ) => async (value: SignUp.Variables) => {
    const res = await signup({ variables: value })
    const token = res && res.data && res.data.registerUser.token
    if (token) {
      LoginActions.onLogin(token)
    }
  }

  SignUpForm = () => {
    return (
      <SignUp.Component>
        {(signup, { loading }) => {
          return (
            <SignupForm signup={this.handleSignup(signup)} loading={loading} />
          )
        }}
      </SignUp.Component>
    )
  }

  LoginForm = () => {
    return (
      <Login.Component>
        {(login, { error, loading }) => {
          return (
            <div style={{ textAlign: 'center' }}>
              {error && <p>{error.message}</p>}
              <LoginForm login={this.handleLogin(login)} loading={loading} />
            </div>
          )
        }}
      </Login.Component>
    )
  }
}

export default GetToken.HOC({})(LoginAndSignupFormContainer)
