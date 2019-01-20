import * as React from 'react'
import { WithApolloClient } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { LoginActions } from 'src/graphql/actions/login'
import { GetToken } from 'src/graphql/components/client/login'
import { Login } from 'src/graphql/components/login'
import { SignUp } from 'src/graphql/components/signup'
import { IRouterComponentProps } from 'src/routes/types'
import { RoutesNames } from '../../routes/constants'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

type Props = WithApolloClient<GetToken.Props<IRouterComponentProps>>

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

  handleComplete = (token: string) => {
    LoginActions.onLogin(token)
  }

  SignUpForm = () => {
    return (
      <SignUp.Component
        onCompleted={({ registerUser }) =>
          this.handleComplete(registerUser.token)
        }
      >
        {signup => {
          return <SignupForm signup={signup} />
        }}
      </SignUp.Component>
    )
  }

  LoginForm = () => {
    return (
      <Login.Component
        onCompleted={({ loginUser }) => this.handleComplete(loginUser.token)}
      >
        {(login, { error }) => {
          return (
            <div style={{ textAlign: 'center' }}>
              {error && <p>{error.message}</p>}
              <LoginForm login={login} />
            </div>
          )
        }}
      </Login.Component>
    )
  }
}

export default GetToken.HOC({})(LoginAndSignupFormContainer)
