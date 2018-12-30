import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginAndSignupFormContainer from 'src/components/loginAndSignup/LoginAndSignupFormContainer'
import AddProjectContainer from 'src/components/project/AddProjectContainer'
import ProjectsListContainer from 'src/components/project/ProjectsListContainer'
import SingleProjectContainer from 'src/components/project/SingleProjectContainer'
import NavBarContainer from 'src/components/UI/NavBar/NavBarContainer'
import TopPage from '../components/topPage/TopPage'
import { Styles } from '../styles/sharedStyles'
import { routes } from './constants'
import PrivateRoutes from './PrivateRoutes'
import EditUserProfileContainer from 'src/components/userProfile/EditUserProfileContainer'

class Routes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route path={routes.top} component={NavBarContainer} />
        <Styles.AppWrapper>
          <Switch>
            <Route path="/" exact component={TopPage} />
            <PrivateRoutes
              path={routes.dashboard}
              exact
              component={() => <h1>Dashboard</h1>}
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
            <PrivateRoutes
              path={routes.editUserProfile()}
              exact
              component={EditUserProfileContainer}
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
        </Styles.AppWrapper>
      </React.Fragment>
    )
  }
}

export default Routes
