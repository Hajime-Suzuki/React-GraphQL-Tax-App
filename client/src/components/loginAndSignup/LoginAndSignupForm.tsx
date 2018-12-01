import gql from 'graphql-tag'
import * as React from 'react'
import LoginFormGQL from './LoginFormGQL'
import { LOGIN_MUTATION, LoginMutation } from './loginQueryMutation'

import { LoadingIcon } from '../UI/LoadingIcon'
import Typography from '@material-ui/core/Typography'
import { ApolloConsumer } from 'react-apollo'
import { storeJwt, decodeJwt } from 'src/libs/jwt'

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
