import * as React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { GetToken } from 'src/graphql/components/client/login'
import { routes } from './constants'

interface Props {
  path: string
}
interface ApolloProps {
  data: GetToken.Query
}

const PrivateRoutes: React.SFC<Props & RouteProps & ApolloProps> = props => {
  const {
    data: { userId },
    component,
    ...rest
  } = props

  if (!userId) {
    return <Redirect to={routes.login} />
  }

  const Component = component as any
  return <Route {...rest} render={props => <Component {...props} />} />
}

export default GetToken.HOC<Props & RouteProps>({})(PrivateRoutes)
