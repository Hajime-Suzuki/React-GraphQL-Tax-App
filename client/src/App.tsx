import React from 'react'
import Routes from './routes/Routes'
import { Get_UserComponent } from './graphql/components/login'
import { LoadingIcon } from './view/UI/LoadingIcon'

class App extends React.Component {
  public render() {
    return (
      <Get_UserComponent>
        {({ loading }) => {
          if (loading) return <LoadingIcon />
          return <Routes />
        }}
      </Get_UserComponent>
    )
  }
}

export default App
