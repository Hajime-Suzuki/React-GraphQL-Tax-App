import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AddClientFormContainer from 'src/view/client/AddClientFormContainer'
import ClientsListContainer from 'src/view/client/ClientsListContainer'
import SingleClientContainer from 'src/view/client/SingleClientContainer'
import DashBoard from 'src/view/dashBoard/DashBoard'
import FiscalOverview from 'src/view/fiscalOverview'
import LoginAndSignupFormContainer from 'src/view/loginAndSignup/LoginAndSignupFormContainer'
import AddProjectContainer from 'src/view/project/addProject'
import ProjectsListContainer from 'src/view/project/projectLists'
import SingleProjectContainer from 'src/view/project/singleProject'
import UserExpenses from 'src/view/userExpenses'
import NewUserExpense from 'src/view/userExpenses/new-expenses'
import EditUserProfileContainer from 'src/view/userProfile/EditUserProfileContainer'
import { Styles } from '../styles/sharedStyles'
import TopPage from '../view/topPage/TopPage'
import { RoutesNames } from './route-names'
import PrivateRoutes from './PrivateRoutes'

const dashBoardRoutes = [{ path: RoutesNames.dashboard, component: DashBoard }]

const fiscalRoutes = [
  { path: RoutesNames.fiscalOverview(), component: FiscalOverview }
]

const projectRoutes = [
  { path: RoutesNames.projects, component: ProjectsListContainer },
  { path: RoutesNames.addProject, component: AddProjectContainer },
  { path: RoutesNames.singleProject(), component: SingleProjectContainer }
]
const userExpenseRoutes = [
  { path: RoutesNames.userExpenses(), component: UserExpenses },
  { path: RoutesNames.addUserExpenses(), component: NewUserExpense }
]
const clientRoutes = [
  { path: RoutesNames.clientsList, component: ClientsListContainer },
  { path: RoutesNames.addClient, component: AddClientFormContainer },
  { path: RoutesNames.singleClient(), component: SingleClientContainer }
]

const userProfileRoutes = [
  { path: RoutesNames.editUserProfile, component: EditUserProfileContainer }
]

const loginRoutes = [
  { path: RoutesNames.login, component: LoginAndSignupFormContainer },
  { path: RoutesNames.signup, component: LoginAndSignupFormContainer }
]

class Routes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Styles.AppWrapper>
          <Route path={RoutesNames.top} exact component={TopPage} />
          <Switch>
            {renderPrivateRoutes(dashBoardRoutes)}
            {renderPrivateRoutes(fiscalRoutes)}
            {renderPrivateRoutes(projectRoutes)}
            {renderPrivateRoutes(userExpenseRoutes)}
            {renderPrivateRoutes(clientRoutes)}
            {renderPrivateRoutes(userProfileRoutes)}
            {renderRoutes(loginRoutes)}
          </Switch>
        </Styles.AppWrapper>
      </React.Fragment>
    )
  }
}

const renderPrivateRoutes = (
  routes: { path: string; component: React.ComponentType<any> }[]
) => {
  return routes.map(({ path, component }, i) => {
    return <PrivateRoutes path={path} exact component={component} key={i} />
  })
}
const renderRoutes = (
  routes: { path: string; component: React.ComponentType<any> }[]
) => {
  return routes.map(({ path, component }, i) => {
    return <Route path={path} exact component={component} key={i} />
  })
}

export default Routes
