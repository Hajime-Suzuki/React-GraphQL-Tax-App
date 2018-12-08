import * as React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { GetToken } from 'src/graphql/components/client/login'
import { Login } from 'src/graphql/components/login'
import { decodeJwt, storeJwt } from 'src/libs/jwt'
import { routes } from '../../routes/constants'
import LoginForm from './LoginForm'

type Props = RouteComponentProps & { data: GetToken.Query }

class LoginAndSignupFormContainer extends React.Component<Props> {
  render() {
    const { data: localData } = this.props
    console.log(localData)
    return (
      <ApolloConsumer>
        {client => {
          if (localData.userId) return <Redirect to={routes.dashboard} />
          return (
            <Login.Component
              onCompleted={({ loginUser }) => {
                storeJwt(loginUser.token)
                client.writeData({
                  data: { userId: decodeJwt(loginUser.token).id }
                })
              }}
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
        }}
      </ApolloConsumer>
    )
  }
}

export default GetToken.HOC({})(LoginAndSignupFormContainer)
