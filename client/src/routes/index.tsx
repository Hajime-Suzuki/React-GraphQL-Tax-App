import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginAndSignupFormContainer from 'src/view/loginAndSignup/LoginAndSignupFormContainer'
import AddProjectContainer from 'src/view/project/addProject'
import ProjectsListContainer from 'src/view/project/projectLists'
import SingleProjectContainer from 'src/view/project/singleProject'
import NavBarContainer from 'src/view/UI/NavBar/NavBarContainer'
import TopPage from '../view/topPage/TopPage'
import { Styles } from '../styles/sharedStyles'
import { RoutesNames } from './route-names'
import PrivateRoutes from './PrivateRoutes'
import EditUserProfileContainer from 'src/view/userProfile/EditUserProfileContainer'
import ClientsListContainer from 'src/view/client/ClientsListContainer'
import SingleClientContainer from 'src/view/client/SingleClientContainer'
import AddClientFormContainer from 'src/view/client/AddClientFormContainer'
import DashBoard from 'src/view/dashBoard/DashBoard'
import FiscalOverview from 'src/view/fiscalOverview'
import UserExpenses from 'src/view/userExpenses'
import NewUserExpense from 'src/view/userExpenses/new-expenses'
import ProjectRoutes from './paths/ProjectRoutes'
import ClientRoutes from './paths/ClientRoutes'
import UserExpenseRoutes from './paths/UserExpenseRoutes'
import LoginRoutes from './paths/LoginRoutes'
import DashboardRoutes from './paths/DashboardRoutes'
import FiscalRoutes from './paths/FiscalRoutes'
import UserProfileRoutes from './paths/UserProfileRoutes'

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
            <DashboardRoutes />
            <FiscalRoutes />
            <ProjectRoutes />
            <UserExpenseRoutes />
            <ClientRoutes />
            <UserProfileRoutes />
            <LoginRoutes />
          </Switch>
        </Styles.AppWrapper>
      </React.Fragment>
    )
  }
}

export default Routes
