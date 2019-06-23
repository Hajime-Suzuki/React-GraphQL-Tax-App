import React from 'react'
import { Route } from 'react-router-dom'
import { Styles } from '../styles/sharedStyles'
import TopPage from '../view/topPage/TopPage'
import ClientRoutes from './paths/ClientRoutes'
import DashboardRoutes from './paths/DashboardRoutes'
import FiscalRoutes from './paths/FiscalRoutes'
import LoginRoutes from './paths/LoginRoutes'
import ProjectRoutes from './paths/ProjectRoutes'
import UserExpenseRoutes from './paths/UserExpenseRoutes'
import UserProfileRoutes from './paths/UserProfileRoutes'
import { RoutesNames } from './route-names'

class Routes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Styles.AppWrapper>
          <Route path={RoutesNames.top} exact component={TopPage} />
          <DashboardRoutes />
          <FiscalRoutes />
          <ProjectRoutes />
          <UserExpenseRoutes />
          <ClientRoutes />
          <UserProfileRoutes />
          <LoginRoutes />
        </Styles.AppWrapper>
      </React.Fragment>
    )
  }
}

export default Routes
