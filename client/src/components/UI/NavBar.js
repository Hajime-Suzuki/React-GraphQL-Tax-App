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
import { logOut } from '../../redux/modules/signupLogin/singupLogin'

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

const NavBar = ({ user, userId, logOut }) => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <IconButton>
          <Icon className="fas fa-bars" />
        </IconButton>
        <Typography className="logo" variant="headline">
          Tax!
        </Typography>
        {!userId && (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
        {!userId && (
          <Link to="/signup">
            <Button>Signup</Button>
          </Link>
        )}

        {user && (
          <Typography>
            {user.firstName} {user.lastName}
          </Typography>
        )}
        {userId && (
          <Link to={`/dashboard/${userId}`}>
            <Button>DashBoard</Button>
          </Link>
        )}
        {userId && <Button onClick={logOut}>Logout</Button>}
      </Toolbar>
    </StyledAppBar>
  )
}

const mapSateToProps = state => ({
  userId: state.userId,
  user: state.data.user[state.userId]
})

export default connect(
  mapSateToProps,
  { logOut }
)(NavBar)
