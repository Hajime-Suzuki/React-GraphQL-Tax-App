import React from 'react'
import PrivateRoutes from '../PrivateRoutes'
import { RoutesNames } from '../route-names'
import UserExpenses from 'src/view/userExpenses'
import NewUserExpense from 'src/view/userExpenses/new-expenses'

const UserExpenseRoutes = () => {
  return (
    <>
      <PrivateRoutes
        path={RoutesNames.userExpenses()}
        exact
        component={UserExpenses}
      />
      <PrivateRoutes
        path={RoutesNames.addUserExpenses()}
        exact
        component={NewUserExpense}
      />
    </>
  )
}

export default UserExpenseRoutes
