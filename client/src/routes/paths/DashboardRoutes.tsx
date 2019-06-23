import React from 'react'
import DashBoard from 'src/view/dashBoard/DashBoard'
import PrivateRoutes from '../PrivateRoutes'
import { RoutesNames } from '../route-names'

const DashboardRoutes = () => {
  return (
    <>
      <PrivateRoutes path={RoutesNames.dashboard} exact component={DashBoard} />
    </>
  )
}

export default DashboardRoutes
