import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  GET_USER,
  GetUserQuery,
  GET_USER_ID,
  UserIdQuery
} from '../../loginAndSignup/loginQueryMutation'
import NavBar from './NavBar'

const NavBarContainer: React.SFC<RouteComponentProps> = props => {
  return (
    <UserIdQuery query={GET_USER_ID}>
      {({ data: localState }) => {
        return (
          <GetUserQuery query={GET_USER} variables={{ id: localState!.userId }}>
            {({ data }) => {
              console.log(data, '======')
              return (
                <NavBar
                  user={data && data.getUser}
                  path={props.location.pathname}
                />
              )
            }}
          </GetUserQuery>
        )
      }}
    </UserIdQuery>
  )
}

export default NavBarContainer
