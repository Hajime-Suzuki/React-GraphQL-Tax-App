import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'
import DashBoardComponent from '../components/dashBoard/DashBoardComponent'
import LoginAndSignupForm from '../components/loginAndSignup/LoginAndSignupForm'
import ProjectsListComponent from '../components/project/ProjectsListComponent'
import TopPage from '../components/topPage/TopPage'
import PrivateRoutes from './PrivateRoutes'
import SingleProjectComponent from '../components/project/SingleProjectComponent'
import AddProjectFormContainer from '../components/project/AddProjectFormContainer'
import NavBar from '../components/UI/NavBar'
import { MainWrapper } from '../styles/sharedStyles'

class Routes extends Component {
  render() {
    return (
      <Fragment>
        <Route path="/" component={NavBar} />
        <MainWrapper>
          <Switch>
            <Route path="/" exact component={TopPage} />
            <PrivateRoutes
              path="/dashboard"
              exact
              component={DashBoardComponent}
            />
            <PrivateRoutes
              path="/projects"
              exact
              component={ProjectsListComponent}
            />
            <PrivateRoutes
              path="/projects/new"
              exact
              component={AddProjectFormContainer}
            />
            <PrivateRoutes
              path="/projects/:id"
              exact
              component={SingleProjectComponent}
            />
            <Route path="/login" exact component={LoginAndSignupForm} />
            <Route path="/signup" exact component={LoginAndSignupForm} />
          </Switch>
        </MainWrapper>
      </Fragment>
    )
  }
}

export default Routes
