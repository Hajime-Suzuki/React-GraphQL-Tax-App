import React from 'react'
import { LoginActions } from 'src/graphql/actions/login'
import { GetToken } from 'src/graphql/components/client/login'
import { GetUser } from 'src/graphql/components/login'
import { IRouterComponentProps } from 'src/routes/types'
import NavBar from './NavBar'
import { RoutesNames } from 'src/routes/constants'
import { ApolloConsumer } from 'react-apollo'
import ApolloClient from 'apollo-client'

type Props = GetToken.Props<IRouterComponentProps>

export interface NavBarChildProp {
  loading: boolean
  user?: GetUser.GetUser
  path: string
  logout: () => void

  isSideBarOpen: boolean
  openSideBar: () => void
  closeSideBar: () => void

  menuAnchor: HTMLElement | null
  openMenu: (e: React.MouseEvent<HTMLElement>) => void
  closeMenu: () => void

  navigateTo: (url: string) => () => void
}

class NavBarContainer extends React.Component<Props> {
  state = { isSideBarOpen: false, menuAnchor: null }

  openSideBar = () => this.setState({ isSideBarOpen: true })
  closeSideBar = () => this.setState({ isSideBarOpen: false })

  openMenu = (e: React.MouseEvent<HTMLElement>) =>
    this.setState({ menuAnchor: e.currentTarget })
  closeMenu = () => this.setState({ menuAnchor: null })

  navigateTo = (url: string) => () => {
    this.props.history.push(url)
    this.closeSideBar()
  }

  handleLogout = async () => {
    this.closeMenu()
    await LoginActions.logout()
    this.props.history.replace(RoutesNames.top)
  }

  render() {
    return (
      <GetUser.Component>
        {({ data, loading }) => {
          const user = (data && data.getUser) || undefined
          console.log({ user }, data && data.getUser)
          return (
            <NavBar
              loading={loading}
              user={user}
              path={this.props.location.pathname}
              logout={this.handleLogout}
              isSideBarOpen={this.state.isSideBarOpen}
              openSideBar={this.openSideBar}
              closeSideBar={this.closeSideBar}
              menuAnchor={this.state.menuAnchor}
              openMenu={this.openMenu}
              closeMenu={this.closeMenu}
              navigateTo={this.navigateTo}
            />
          )
        }}
      </GetUser.Component>
    )
  }
}

export default NavBarContainer
