import React from 'react'
import { Route } from 'react-router-dom'
import { RoutesNames } from '../route-names'
import LoginAndSignupFormContainer from 'src/view/loginAndSignup/LoginAndSignupFormContainer'

const LoginRoutes = () => {
  return (
    <>
      <Route
        path={RoutesNames.login}
        exact
        component={LoginAndSignupFormContainer as any}
      />
      <Route
        path={RoutesNames.signup}
        exact
        component={LoginAndSignupFormContainer as any}
      />
    </>
  )
}

export default LoginRoutes
