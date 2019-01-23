import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { RoutesNames } from '../../../routes/constants'
import { NavBarChildProp } from './NavBarContainer'
import SideBar from './SideBar'

const StyledAppBar: any = styled(AppBar)`
  && {
    a {
      text-decoration: none;
    }
    button {
      color: white;
    }
    .logo {
      flex-grow: 1;
      text-align: left;
      color: white;
    }
  }
`

const styles = theme =>
  createStyles({
    menuItem: {
      display: 'none',

      [theme.breakpoints.up('sm')]: {
        display: 'inline-block'
      }
    }
  })

const NavBar: React.FunctionComponent<
  NavBarChildProp & WithStyles<typeof styles>
> = props => {
  const {
    loading,
    openSideBar,
    menuAnchor,
    openMenu,
    closeMenu,
    path,
    user,
    logout,
    classes
  } = props
  return (
    <StyledAppBar position="static">
      <Toolbar disableGutters>
        {!loading && (
          <React.Fragment>
            <SideBar {...props} />
            <IconButton onClick={openSideBar}>
              <Icon className="fas fa-bars" />
            </IconButton>
            {!user && (
              <Link to={RoutesNames.login} className={classes.menuItem}>
                <Button>Login</Button>
              </Link>
            )}

            <div
              style={{
                width: '100%',
                textAlign: 'right',
                marginRight: '1em'
              }}
            >
              {!user && (
                <Link to={RoutesNames.signup} className={classes.menuItem}>
                  <Button>Signup</Button>
                </Link>
              )}
              {!user && (
                <Link to={RoutesNames.login} className={classes.menuItem}>
                  <Button>Login</Button>
                </Link>
              )}
              {user && path.startsWith(RoutesNames.clientsList) && (
                <Link to={RoutesNames.addClient} className={classes.menuItem}>
                  <Button>Add</Button>
                </Link>
              )}
              {user && path.startsWith(RoutesNames.projects) && (
                <Link to={RoutesNames.addProject} className={classes.menuItem}>
                  <Button>Add</Button>
                </Link>
              )}
              <Button onClick={openMenu}>More</Button>
              <Menu
                id="simple-menu"
                anchorEl={menuAnchor}
                open={!!menuAnchor}
                onClose={closeMenu}
              >
                {user && <MenuItem onClick={logout}>Logout</MenuItem>}
              </Menu>
            </div>
          </React.Fragment>
        )}
      </Toolbar>
    </StyledAppBar>
  )
}

export default withStyles(styles)(NavBar)
