import * as React from 'react'
import {
  Route,
  RouteComponentProps,
  RouteProps,
  withRouter
} from 'react-router-dom'
import { GetUser } from 'src/graphql/components/login'
import { LoginActions } from '../graphql/actions/login'

type Props = GetUser.Props<RouteComponentProps & RouteProps>
class PrivateRoutes extends React.Component<Props> {
  logoutAndRedirect = () => {
    LoginActions.logout().then(() => {
      this.props.history.replace('/')
    })
    return null
  }

  render() {
    const { data, component, ...rest } = this.props
    if (!data || data.loading) return null

    const isNetworkErorr = data.error && data.error.networkError
    const isAuthError =
      isNetworkErorr &&
      (isNetworkErorr as any).result.errors
        .map((e: any) => e.extensions.code)
        .includes('UNAUTHENTICATED')

    if (isAuthError) return this.logoutAndRedirect()

    if (isNetworkErorr) {
      return 'Network Error'
    }

    if (!data.getUser || (data.getUser && !data.getUser.id))
      return this.logoutAndRedirect()

    const Component = component as any
    return (
      <Route
        {...rest}
        render={props => <Component {...props} userId={data.getUser!.id} />}
      />
    )
  }
}

export default withRouter(GetUser.HOC<Props>({})(PrivateRoutes))
