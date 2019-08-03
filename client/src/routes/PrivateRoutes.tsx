import * as React from 'react'
import {
  Route,
  RouteComponentProps,
  RouteProps,
  withRouter
} from 'react-router-dom'
import { withGet_User, Get_UserProps } from 'src/graphql/components/login'
import { LoginActions } from '../graphql/actions/login'

type Props = Get_UserProps<RouteComponentProps & RouteProps>
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

    const isNetworkError = data.error && data.error.networkError
    const isAuthError =
      isNetworkError &&
      (isNetworkError as any).result &&
      (isNetworkError as any).result.errors
        .map((e: any) => e.extensions.code)
        .includes('UNAUTHENTICATED')

    if (isAuthError) return this.logoutAndRedirect()

    if (isNetworkError) {
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

export default withRouter(withGet_User<Props>({})(PrivateRoutes))
