import Drawer from '@material-ui/core/Drawer'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { RoutesNames } from 'src/routes/constants'
import { NavBarChildProp } from './NavBarContainer'
import React from 'react'

const menuItems = [
  { path: RoutesNames.dashboard, title: 'Dashboard' },
  { path: RoutesNames.projects, title: 'Projects' },
  { path: RoutesNames.userExpenses, title: 'Expenses' },
  { path: RoutesNames.clientsList, title: 'Clients' }
]

const SideBar: React.FunctionComponent<NavBarChildProp> = props => {
  const { user, isSideBarOpen: isOpen, closeSideBar, navigateTo } = props
  return (
    <Drawer open={isOpen} onClose={closeSideBar} anchor="right">
      {menuItems.map(menu => {
        return (
          user && (
            <ListItem key={menu.path} button onClick={navigateTo(menu.path)}>
              <ListItemText primary={menu.title} />
            </ListItem>
          )
        )
      })}
    </Drawer>
  )
}

export default SideBar
