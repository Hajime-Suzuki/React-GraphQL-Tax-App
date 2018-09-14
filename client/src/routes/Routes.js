import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import DashBoard from '../components/dashBoard/DashBoard'
import LoginFormComponent from '../components/login/LoginFormComponent'
import SignupFormComponent from '../components/signup/SignupFormComponent'
import TopPage from '../components/topPage/TopPage'
import PrivateRoutes from './PrivateRoutes'
import DashBoardComponent from '../components/dashBoard/DashBoardComponent'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={TopPage} />
        <PrivateRoutes
          path="/dashboard/:id"
          exact
          component={DashBoardComponent}
        />
        <Route path="/login" exact component={LoginFormComponent} />
        <Route path="/signup" exact component={SignupFormComponent} />
      </Switch>
    )
  }
}

export default Routes
