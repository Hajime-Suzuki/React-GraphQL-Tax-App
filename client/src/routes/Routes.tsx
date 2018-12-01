import * as React from 'react'
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
import { routes } from './constants'

class Routes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route path={routes.top} component={NavBar} />
        <MainWrapper>
          <Switch>
            <Route path="/" exact component={TopPage} />
            <PrivateRoutes
              path={routes.dashboard}
              exact
              component={DashBoardComponent}
            />
            <PrivateRoutes
              path={routes.projects}
              exact
              component={ProjectsListComponent}
            />
            <PrivateRoutes
              path={routes.addProject}
              exact
              component={AddProjectFormContainer}
            />
            <PrivateRoutes
              path={routes.singleProject()}
              exact
              component={SingleProjectComponent}
            />
            <Route path={routes.login} exact component={LoginAndSignupForm} />
            <Route path={routes.signup} exact component={LoginAndSignupForm} />
          </Switch>
        </MainWrapper>
      </React.Fragment>
    )
  }
}

export default Routes
