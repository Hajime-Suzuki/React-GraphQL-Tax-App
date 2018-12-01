import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { loginOrSignup } from '../../redux/modules/user'
import { routes } from '../../routes/constants'
import { LoginAndSignupForm } from './LoginAndSignupForm'

interface PropsFromState {
  userId: string
  loginSignupStatus: any
}
interface Dispatch {
  loginOrSignup: any
}

type Props = PropsFromState & Dispatch & RouteComponentProps

class LoginAndSignupFormContainer extends React.Component<Props> {
  submit = values => {
    const type = this.props.match.path === '/signup' ? 'signup' : 'login'
    this.props.loginOrSignup(type, values)
  }

  render() {
    const { userId, loginSignupStatus, match } = this.props

    if (userId) return <Redirect to={routes.dashboard} />
    return (
      <LoginAndSignupForm
        path={match.path === '/signup' ? 'Signup' : 'Login'}
        message={loginSignupStatus.message}
        submit={this.submit}
      />
    )
  }
}

const mapSateToProps = state => {
  return {
    userId: state.user.getId(),
    loginSignupStatus: state.user.getStatus()
  }
}

export default connect<PropsFromState, Dispatch>(
  mapSateToProps,
  { loginOrSignup }
)(LoginAndSignupFormContainer)
