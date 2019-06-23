import React from 'react'
import PrivateRoutes from '../PrivateRoutes'
import { RoutesNames } from '../route-names'
import ClientsListContainer from 'src/view/client/ClientsListContainer'
import AddClientFormContainer from 'src/view/client/AddClientFormContainer'
import SingleClientContainer from 'src/view/client/SingleClientContainer'

const ClientRoutes = () => {
  return (
    <>
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
    </>
  )
}

export default ClientRoutes
