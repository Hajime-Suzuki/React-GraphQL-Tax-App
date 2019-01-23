import Drawer from '@material-ui/core/Drawer'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { RoutesNames } from 'src/routes/constants'
import { NavBarChildProp } from './NavBarContainer'
import React from 'react'

const menuItems = [
  { path: RoutesNames.projects, title: 'Projects' },
  { path: RoutesNames.dashboard, title: 'Dashboard' },
  { path: RoutesNames.clientsList, title: 'Clients' },
  { path: RoutesNames.editUserProfile, title: 'Profile' }
]

const SideBar: React.FunctionComponent<NavBarChildProp> = props => {
  const { user, isSideBarOpen: isOpen, closeSideBar, navigateTo } = props
  return (
    <Drawer open={isOpen} onClose={closeSideBar}>
      {menuItems.map(menu => {
        return (
          user && (
            <ListItem button onClick={navigateTo(menu.path)}>
              <ListItemText primary={menu.title} />
            </ListItem>
          )
        )
      })}
    </Drawer>
  )
}

export default SideBar
