import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import styled from 'styled-components'
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { routes } from '../../routes/constants'
import { logout } from '../../redux/modules/user'
import { withStyles } from '@material-ui/core/styles'

const StyledAppBar = styled(AppBar)`
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

const styles = theme => ({
  menuItem: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  }
})

const NavBar = props => {
  const { user, userId, logout, classes } = props
  console.log(props)

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
        {!userId && (
          <Link to={routes.login} className={classes.menuItem}>
            <Button>Login</Button>
          </Link>
        )}

        {!userId && (
          <Link to={routes.signup} className={classes.menuItem}>
            <Button>Signup</Button>
          </Link>
        )}

        {userId && (
          <Typography>
            {user.firstName} {user.lastName}
          </Typography>
        )}

        {userId && (
          <Link to={routes.projects} className={classes.menuItem}>
            <Button>Projects</Button>
          </Link>
        )}

        {userId && (
          <Link to={routes.dashboard} className={classes.menuItem}>
            <Button>DashBoard</Button>
          </Link>
        )}
        {userId && (
          <Button onClick={logout} className={classes.menuItem}>
            Logout
          </Button>
        )}
      </Toolbar>
    </StyledAppBar>
  )
}

const mapSateToProps = state => ({
  userId: state.user.getId(),
  user: state.entities.user
  // user: state.data.user[state.userId]
})

export default connect(
  mapSateToProps,
  { logout }
)(withStyles(styles)(NavBar))
