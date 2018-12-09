import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { client } from 'src/graphql/client'
import { GetToken } from 'src/graphql/components/client/login'
import { Login } from 'src/graphql/components/login'
import { decodeJwt, storeJwt } from 'src/libs/jwt'
import { routes } from '../../routes/constants'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { SignUp } from 'src/graphql/components/signup'

type Props = RouteComponentProps & { data: GetToken.Query }

class LoginAndSignupFormContainer extends React.Component<Props> {
  render() {
    const path = this.props.location.pathname
    const { data: localData } = this.props
    if (localData.userId) return <Redirect to={routes.dashboard} />
    return path === routes.login ? <this.LoginForm /> : <this.SignUpForm />
  }

  handleComplete(token: string) {
    storeJwt(token)
    client.writeData({
      data: { userId: decodeJwt(token).id }
    })
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
