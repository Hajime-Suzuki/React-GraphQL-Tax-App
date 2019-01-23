import React from 'react'
import { LoginActions } from 'src/graphql/actions/login'
import { GetToken } from 'src/graphql/components/client/login'
import { GetUser } from 'src/graphql/components/login'
import { IRouterComponentProps } from 'src/routes/types'
import NavBar from './NavBar'

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

  handleLogout = async () => LoginActions.logout()
  render() {
    const userId = this.props.data!.userId
    console.log({ userId })

    return (
      <GetUser.Component>
        {({ data, loading }) => {
          return (
            <NavBar
              loading={loading}
              user={data && data.getUser}
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

export default GetToken.HOC({})(NavBarContainer)
