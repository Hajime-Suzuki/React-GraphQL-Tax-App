import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import NavBar from './NavBar'
import { GetToken, Logout } from 'src/graphql/components/client/login'
import { GetUser } from 'src/graphql/components/login'

const NavBarContainer: React.SFC<Logout.Props<RouteComponentProps>> = props => {
  // TODO: update cache when log out
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
                  logout={props.mutate!}
                />
              )
            }}
          </GetUser.Component>
        )
      }}
    </GetToken.Component>
  )
}

export default Logout.HOC({})(NavBarContainer)
