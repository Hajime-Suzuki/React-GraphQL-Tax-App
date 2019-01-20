import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { RoutesNames } from '../../../routes/constants'
import { GetUser } from 'src/graphql/components/login'

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
        display: 'block'
      }
    }
  })

interface Props {
  user?: GetUser.GetUser | null
  logout?: () => void
  path: string
}

const NavBar: React.FunctionComponent<
  Props & WithStyles<typeof styles>
> = props => {
  const { classes, user, path, logout } = props
  return (
    <StyledAppBar position="static">
      <Toolbar disableGutters>
        <IconButton>
          <Icon className="fas fa-bars" />
        </IconButton>
        <Typography
          className={['logo', classes.menuItem].join(' ')}
          variant="headline"
        >
          Tax!
        </Typography>
        {!user && (
          <Link to={RoutesNames.login} className={classes.menuItem}>
            <Button>Login</Button>
          </Link>
        )}

        {!user && (
          <Link to={RoutesNames.signup} className={classes.menuItem}>
            <Button>Signup</Button>
          </Link>
        )}

        {user && (
          <Typography>
            {user.firstName} {user.lastName}
          </Typography>
        )}

        {user && path.startsWith(RoutesNames.projects) && (
          <Link to={RoutesNames.addProject} className={classes.menuItem}>
            <Button>Add</Button>
          </Link>
        )}

        {user && (
          <Link to={RoutesNames.projects} className={classes.menuItem}>
            <Button>Projects</Button>
          </Link>
        )}

        {user && (
          <Link to={RoutesNames.dashboard} className={classes.menuItem}>
            <Button>DashBoard</Button>
          </Link>
        )}
        {user && (
          <Link to={RoutesNames.editUserProfile} className={classes.menuItem}>
            <Button>Edit Profile</Button>
          </Link>
        )}

        {user && path.startsWith(RoutesNames.clientsList) && (
          <Link to={RoutesNames.addClient} className={classes.menuItem}>
            <Button>Add</Button>
          </Link>
        )}
        {user && (
          <Link to={RoutesNames.clientsList} className={classes.menuItem}>
            <Button>Clients</Button>
          </Link>
        )}
        {user && (
          <Button onClick={logout} className={classes.menuItem}>
            Logout
          </Button>
        )}
      </Toolbar>
    </StyledAppBar>
  )
}

export default withStyles(styles)(NavBar)
