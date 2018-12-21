import * as React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { routes } from './constants'
import { GetToken } from 'src/graphql/components/client/login'

class PrivateRoutes extends React.PureComponent<GetToken.Props<RouteProps>> {
  render() {
    const { data, component, ...rest } = this.props

    if (!data!.userId) {
      return <Redirect to={routes.login} />
    }

    const Component = component as any
    return <Route {...rest} render={props => <Component {...props} />} />
  }
}

export default GetToken.HOC<RouteProps>({})(PrivateRoutes)
