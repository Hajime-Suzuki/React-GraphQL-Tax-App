import React, { FC, useState } from 'react'
import { LoginActions } from 'src/graphql/actions/login'
import { GetToken } from 'src/graphql/components/client/login'

import { RoutesNames } from 'src/routes/constants'
import { IRouterComponentProps } from 'src/routes/types'
import NavBar from './NavBar'
import { Get_UserComponent, Get_UserQuery } from 'src/graphql/components/login'
import { QUser } from 'src/graphql/@types/types'

type Props = GetToken.Props<IRouterComponentProps>

export interface NavBarChildProp {
  loading: boolean
  user?: QUser
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

const NavBarContainer: FC<Props> = props => {
  const [isSideBarOpen, setSideBarOpen] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState<
    EventTarget & HTMLElement | null
  >(null)

  const openSideBar = () => setSideBarOpen(true)
  const closeSideBar = () => setSideBarOpen(false)

  const openMenu = (e: React.MouseEvent<HTMLElement>) =>
    setMenuAnchor(e.currentTarget)
  const closeMenu = () => setMenuAnchor(null)

  const navigateTo = (url: string) => () => {
    props.history.push(url)
    closeMenu()
    closeSideBar()
  }

  const handleLogout = async () => {
    closeMenu()
    await LoginActions.logout()
    props.history.replace(RoutesNames.top)
  }

  return (
    <Get_UserComponent>
      {({ data, loading }) => {
        const user = (data && data.getUser) || undefined
        return (
          <NavBar
            loading={loading}
            user={user}
            path={props.location.pathname}
            logout={handleLogout}
            isSideBarOpen={isSideBarOpen}
            openSideBar={openSideBar}
            closeSideBar={closeSideBar}
            menuAnchor={menuAnchor}
            openMenu={openMenu}
            closeMenu={closeMenu}
            navigateTo={navigateTo}
          />
        )
      }}
    </Get_UserComponent>
  )
}

export default NavBarContainer
