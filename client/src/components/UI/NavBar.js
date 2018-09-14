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

const NavBar = ({ user, logOut }) => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <IconButton>
          <Icon className="fas fa-bars" />
        </IconButton>
        <Typography className="logo" variant="headline">
          Tax!
        </Typography>
        {!user && (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
        {!user && (
          <Link to="/signup">
            <Button>Signup</Button>
          </Link>
        )}
        {user && (
          <Link to={`/dashboard/${user}`}>
            <Button>DashBoard</Button>
          </Link>
        )}
        {user && <Button onClick={logOut}>Logout</Button>}
      </Toolbar>
    </StyledAppBar>
  )
}

const mapSateToProps = state => ({
  user: state.user
})

export default connect(
  mapSateToProps,
  { logOut }
)(NavBar)
