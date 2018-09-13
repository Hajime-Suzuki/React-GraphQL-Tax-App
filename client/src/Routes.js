import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import DashBoard from './components/dashBoard/DashBoard'
import LoginFormComponent from './components/login/LoginFormComponent'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={DashBoard} />
        <Route path="/login" exact component={LoginFormComponent} />
      </Switch>
    )
  }
}

export default Routes
