import React from 'react'
import { LoginActions } from 'src/graphql/actions/login'
import { GetToken } from 'src/graphql/components/client/login'
import { GetUser } from 'src/graphql/components/login'
import { IRouterComponentProps } from 'src/routes/types'
import NavBar from './NavBar'

type Props = GetToken.Props<IRouterComponentProps>

class NavBarContainer extends React.Component<Props> {
  handleLogout = async () => LoginActions.logout()

  render() {
    const userId = this.props.data!.userId
    console.log({ userId })
    if (!userId) {
      return <NavBar path={this.props.location.pathname} />
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
