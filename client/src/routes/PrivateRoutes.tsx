import * as React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { routes } from './constants'
import { GetToken } from 'src/graphql/components/client/login'
import { PrivateRoutesChildProps } from './types'

class PrivateRoutes extends React.Component<
  GetToken.Props<RouteProps> & PrivateRoutesChildProps
> {
  render() {
    const { data, component, ...rest } = this.props
    const userId = data!.userId

    if (!userId) {
      return <Redirect to={routes.login} />
    }

    const Component = component as any
    return (
      <Route
        {...rest}
        render={props => <Component {...props} userId={userId} />}
      />
    )
  }
}

export default GetToken.HOC<RouteProps>({})(PrivateRoutes)
