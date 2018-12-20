import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginAndSignupFormContainer from 'src/components/loginAndSignup/LoginAndSignupFormContainer'
import AddProjectContainer from 'src/components/project/AddProjectContainer'
import ProjectsListContainer from 'src/components/project/ProjectsListContainer'
import NavBarContainer from 'src/components/UI/NavBar/NavBarContainer'
import DashBoardComponent from '../components/dashBoard/DashBoardComponent'
import SingleProjectComponent from '../components/project/SingleProjectComponent'
import TopPage from '../components/topPage/TopPage'
import { MainWrapper } from '../styles/sharedStyles'
import { routes } from './constants'
import PrivateRoutes from './PrivateRoutes'
import SingleProjectContainer from 'src/components/project/SingleProjectContainer'

class Routes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route path={routes.top} component={NavBarContainer} />
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
              component={ProjectsListContainer}
            />
            <PrivateRoutes
              path={routes.addProject}
              exact
              component={AddProjectContainer}
            />
            <PrivateRoutes
              path={routes.singleProject()}
              exact
              component={SingleProjectContainer}
            />
            <Route
              path={routes.login}
              exact
              component={LoginAndSignupFormContainer}
            />
            <Route
              path={routes.signup}
              exact
              component={LoginAndSignupFormContainer}
            />
          </Switch>
        </MainWrapper>
      </React.Fragment>
    )
  }
}

export default Routes
