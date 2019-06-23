import React from 'react'
import FiscalOverview from 'src/view/fiscalOverview'
import PrivateRoutes from '../PrivateRoutes'
import { RoutesNames } from '../route-names'

const FiscalRoutes = () => {
  return (
    <>
      <PrivateRoutes
        path={RoutesNames.fiscalOverview()}
        exact
        component={FiscalOverview}
      />
    </>
  )
}

export default FiscalRoutes
