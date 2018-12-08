import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import NavBar from './NavBar'
import { GetToken } from 'src/graphql/components/client/login'
import { GetUser } from 'src/graphql/components/login'

const NavBarContainer: React.SFC<RouteComponentProps> = props => {
  return (
    <GetToken.Component>
      {({ data: localData }) => {
        return (
          <GetUser.Component variables={{ id: localData!.userId! }}>
            {({ data }) => {
              return (
                <NavBar
                  user={data && data.getUser}
                  path={props.location.pathname}
                />
              )
            }}
          </GetUser.Component>
        )
      }}
    </GetToken.Component>
  )
}

export default NavBarContainer
