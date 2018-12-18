import ApolloClient from 'apollo-client'
import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import { GetToken } from 'src/graphql/components/client/login'
import { GetUser } from 'src/graphql/components/login'
import NavBar from './NavBar'

class NavBarContainer extends React.PureComponent<
  GetToken.Props<RouteComponentProps>
> {
  handleLogout = (client: ApolloClient<any>) => {
    localStorage.removeItem('jwt')
    client.resetStore()
    client.writeData({ data: { userId: null } })
    this.props.history.replace('/')
  }

  render() {
    const userId = this.props.data!.userId
    console.log({ userId })
    if (!userId) {
      return <NavBar path={this.props.location.pathname} />
    }
    return (
      <ApolloConsumer>
        {client => {
          return (
            <GetUser.Component variables={{ id: userId }}>
              {({ data }) => {
                return (
                  <NavBar
                    user={data && data.getUser}
                    path={this.props.location.pathname}
                    logout={() => this.handleLogout(client)}
                  />
                )
              }}
            </GetUser.Component>
          )
        }}
      </ApolloConsumer>
    )
  }
}

export default GetToken.HOC({})(NavBarContainer)
