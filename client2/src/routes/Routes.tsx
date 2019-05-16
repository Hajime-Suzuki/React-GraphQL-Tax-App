import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginAndSignupFormContainer from 'src/view/loginAndSignup/LoginAndSignupFormContainer'
import AddProjectContainer from 'src/view/project/addProject'
import ProjectsListContainer from 'src/view/project/projectLists'
import SingleProjectContainer from 'src/view/project/singleProject'
import NavBarContainer from 'src/view/UI/NavBar/NavBarContainer'
import TopPage from '../view/topPage/TopPage'
import { Styles } from '../styles/sharedStyles'
import { RoutesNames } from './constants'
import PrivateRoutes from './PrivateRoutes'
import EditUserProfileContainer from 'src/view/userProfile/EditUserProfileContainer'
import ClientsListContainer from 'src/view/client/ClientsListContainer'
import SingleClientContainer from 'src/view/client/SingleClientContainer'
import AddClientFormContainer from 'src/view/client/AddClientFormContainer'
import DashBoardContainer from 'src/view/dashBoard/DashBoardContainer'

class Routes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route
          path={RoutesNames.top}
          component={props => <NavBarContainer {...props} />} // directly passing component gets typescript type error.
        />
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
              component={LoginAndSignupFormContainer as any}
            />
            <Route
              path={RoutesNames.signup}
              exact
              component={LoginAndSignupFormContainer as any}
            />
          </Switch>
        </Styles.AppWrapper>
      </React.Fragment>
    )
  }
}

export default Routes
