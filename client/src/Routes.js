import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import DashBoard from './components/dashBoard/DashBoard'

class Routes extends Component {
  render() {
    return <Route path="/" exact component={DashBoard} />
  }
}

export default Routes
