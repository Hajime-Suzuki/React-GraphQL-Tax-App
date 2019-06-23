import React from 'react'
import EditUserProfileContainer from 'src/view/userProfile/EditUserProfileContainer'
import PrivateRoutes from '../PrivateRoutes'
import { RoutesNames } from '../route-names'

const UserProfileRoutes = () => {
  return (
    <>
      <PrivateRoutes
        path={RoutesNames.editUserProfile}
        exact
        component={EditUserProfileContainer}
      />
    </>
  )
}

export default UserProfileRoutes
