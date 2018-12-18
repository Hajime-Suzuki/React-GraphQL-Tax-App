import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { GetToken } from 'src/graphql/components/client/login'
import { GetUser } from 'src/graphql/components/login'
import NavBar from './NavBar'
import { client } from 'src/graphql/client'

class NavBarContainer extends React.Component<
  GetToken.Props<RouteComponentProps>
> {
  handleLogout = () => {
    localStorage.removeItem('jwt')
    client.resetStore()
    client.writeData({ data: { userId: null } })
    this.props.history.replace('/')
  }

  render() {
    const userId = this.props.data!.userId
    if (!userId) {
      return (
        <NavBar
          path={this.props.location.pathname}
          logout={this.handleLogout}
        />
      )
    }
    return (
      <GetUser.Component variables={{ id: userId }}>
        {({ data }) => {
          return (
            <NavBar
              user={data && data.getUser}
              path={this.props.location.pathname}
              logout={this.handleLogout}
            />
          )
        }}
      </GetUser.Component>
    )
  }
}

export default GetToken.HOC({})(NavBarContainer)
