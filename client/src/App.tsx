import React from 'react'
import Routes from './routes'
import { Get_UserComponent } from './graphql/components/login'
import { LoadingIcon } from './view/UI/LoadingIcon'
import NavBarContainer from './view/UI/NavBar/NavBarContainer'

class App extends React.Component {
  public render() {
    return (
      <Get_UserComponent>
        {({ loading }) => {
          if (loading) return <LoadingIcon />

          return (
            <>
              <NavBarContainer />
              <Routes />
            </>
          )
        }}
      </Get_UserComponent>
    )
  }
}

export default App
