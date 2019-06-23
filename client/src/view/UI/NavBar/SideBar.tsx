import Drawer from '@material-ui/core/Drawer'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import { RoutesNames } from 'src/routes/route-names'
import { theme } from 'src/styles/theme'
import styled from 'styled-components'
import { NavBarChildProp } from './NavBarContainer'

const ListMenuItem = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${theme.palette.text.primary};
`

const menuItems = [
  { path: RoutesNames.dashboard, title: 'Dashboard' },
  { path: RoutesNames.projects, title: 'Projects' },
  { path: RoutesNames.userExpenses(), title: 'Expenses' },
  { path: RoutesNames.clientsList, title: 'Clients' }
]

const SideBar: React.FunctionComponent<NavBarChildProp> = props => {
  const { user, isSideBarOpen: isOpen, closeSideBar, navigateTo } = props
  return (
    <Drawer open={isOpen} onClose={closeSideBar} anchor="right">
      {menuItems.map(menu => {
        return (
          user && (
            <ListItem key={menu.path}>
              <ListItemText
                primary={
                  <ListMenuItem
                    style={{
                      textDecoration: 'none',
                      cursor: 'pointer',
                      color: theme.palette.text.primary
                    }}
                    onClick={navigateTo(menu.path)}
                  >
                    {menu.title}
                  </ListMenuItem>
                }
              />
            </ListItem>
          )
        )
      })}
    </Drawer>
  )
}

export default SideBar
