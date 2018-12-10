import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { GetToken } from 'src/graphql/components/client/login'
import { GetUser } from 'src/graphql/components/login'
import NavBar from './NavBar'
import { client } from 'src/graphql/client'

class NavBarContainer extends React.Component<RouteComponentProps> {
  handleLogout = () => {
    localStorage.removeItem('jwt')
    // client.writeData({ data: { userId: null } })
    client.resetStore()
    this.props.history.replace('/')
  }

  render() {
    return (
      <GetToken.Component>
        {({ data: localData }) => {
          return (
            <GetUser.Component variables={{ id: localData!.userId! }}>
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
        }}
      </GetToken.Component>
    )
  }
}

export default NavBarContainer
