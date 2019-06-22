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
      // display: 'none',
      // [theme.breakpoints.up('sm')]: {
      //   display: 'inline-block'
      // }
    }
  })

const NavBar: React.FunctionComponent<
  NavBarChildProp & WithStyles<typeof styles>
> = props => {
  const {
    loading,
    navigateTo,
    openSideBar,
    closeMenu,
    menuAnchor,
    openMenu,
    path,
    user,
    logout,
    classes
  } = props
  return (
    <StyledAppBar position="static">
      <Toolbar disableGutters>
        {!loading && (
          <>
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

              {user && path.startsWith(RoutesNames.projects) && (
                <IconButton onClick={navigateTo(RoutesNames.addProject)}>
                  <Icon className="fas fa-plus" />
                </IconButton>
              )}

              {user && path.startsWith(RoutesNames.clientsList) && (
                <IconButton onClick={navigateTo(RoutesNames.addClient)}>
                  <Icon className="fas fa-plus" />
                </IconButton>
              )}

              {user && path.startsWith(RoutesNames.userExpenses()) && (
                <IconButton onClick={navigateTo(RoutesNames.addUserExpenses())}>
                  <Icon className="fas fa-plus" />
                </IconButton>
              )}

              {user && (
                <>
                  <SideBar {...props} />
                  <IconButton onClick={openSideBar}>
                    <Icon className="fas fa-bars" />
                  </IconButton>
                </>
              )}
              {user && (
                <>
                  <IconButton onClick={openMenu}>
                    <Icon className="far fa-user-circle" />
                  </IconButton>

                  <Menu
                    id="simple-menu"
                    anchorEl={menuAnchor}
                    open={!!menuAnchor}
                    onClose={closeMenu}
                  >
                    {user && (
                      <MenuItem
                        onClick={navigateTo(RoutesNames.editUserProfile)}
                      >
                        Edit Profile
                      </MenuItem>
                    )}
                    {user && <MenuItem onClick={logout}>Logout</MenuItem>}
                  </Menu>
                </>
              )}
            </div>
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  )
}

export default withStyles(styles)(NavBar)
