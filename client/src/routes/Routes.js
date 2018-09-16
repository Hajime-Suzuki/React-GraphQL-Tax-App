import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import DashBoardComponent from '../components/dashBoard/DashBoardComponent'
import LoginAndSignupForm from '../components/loginAndSignup/LoginAndSignupForm'
import ProjectsListComponent from '../components/project/ProjectsListComponent'
import TopPage from '../components/topPage/TopPage'
import PrivateRoutes from './PrivateRoutes'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={TopPage} />
        <PrivateRoutes path="/dashboard" exact component={DashBoardComponent} />
        <PrivateRoutes
          path="/projects"
          exact
          component={ProjectsListComponent}
        />
        <Route path="/login" exact component={LoginAndSignupForm} />
        <Route path="/signup" exact component={LoginAndSignupForm} />
      </Switch>
    )
  }
}

export default Routes
