import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { decodeJwt, storeJwt } from 'src/libs/jwt'
import { LoadingIcon } from '../UI/LoadingIcon'
import LoginFormGQL from './LoginFormGQL'
import { LoginMutation, LOGIN_MUTATION } from './loginQueryMutation'

interface Props {
  path: string
  message: string
  submit: any
}

export const LoginAndSignupForm: React.SFC<Props> = ({
  path,
  submit,
  message
}) => {
  return (
    <ApolloConsumer>
      {client => (
        <LoginMutation
          mutation={LOGIN_MUTATION}
          onCompleted={({ loginUser }) => {
            storeJwt(loginUser.token)
            client.writeData({
              data: { userId: decodeJwt(loginUser.token).id }
            })
          }}
        >
          {(login, { loading, error, data }) => {
            if (loading) return <LoadingIcon />
            return (
              <React.Fragment>
                {error && <Typography>{error.message}</Typography>}
                <LoginFormGQL login={login} />
              </React.Fragment>
            )
          }}
        </LoginMutation>
      )}
    </ApolloConsumer>
  )
}

export default LoginAndSignupForm
