import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginAndSignupFormContainer from 'src/components/loginAndSignup/LoginAndSignupFormContainer'
import AddProjectContainer from 'src/components/project/addProject'
import ProjectsListContainer from 'src/components/project/projectLists'
import SingleProjectContainer from 'src/components/project/singleProject'
import NavBarContainer from 'src/components/UI/NavBar/NavBarContainer'
import TopPage from '../components/topPage/TopPage'
import { Styles } from '../styles/sharedStyles'
import { RoutesNames } from './constants'
import PrivateRoutes from './PrivateRoutes'
import EditUserProfileContainer from 'src/components/userProfile/EditUserProfileContainer'
import ClientsListContainer from 'src/components/client/ClientsListContainer'
import SingleClientContainer from 'src/components/client/SingleClientContainer'
import AddClientFormContainer from 'src/components/client/AddClientFormContainer'
import DashBoardContainer from 'src/components/dashBoard/DashBoardContainer'

class Routes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route path={RoutesNames.top} component={NavBarContainer} />
        <Styles.AppWrapper>
          <Switch>
            <Route path="/" exact component={TopPage} />
            <PrivateRoutes
              path={RoutesNames.dashboard}
              exact
              component={DashBoardContainer}
            />
            <PrivateRoutes
              path={RoutesNames.projects}
              exact
              component={ProjectsListContainer}
            />
            <PrivateRoutes
              path={RoutesNames.addProject}
              exact
              component={AddProjectContainer}
            />
            <PrivateRoutes
              path={RoutesNames.singleProject()}
              exact
              component={SingleProjectContainer}
            />
            <PrivateRoutes
              path={RoutesNames.editUserProfile}
              exact
              component={EditUserProfileContainer}
            />
            <PrivateRoutes
              path={RoutesNames.clientsList}
              exact
              component={ClientsListContainer}
            />
            <PrivateRoutes
              path={RoutesNames.addClient}
              exact
              component={AddClientFormContainer}
            />
            <PrivateRoutes
              path={RoutesNames.singleClient()}
              exact
              component={SingleClientContainer}
            />
            <Route
              path={RoutesNames.login}
              exact
              component={LoginAndSignupFormContainer}
            />
            <Route
              path={RoutesNames.signup}
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
