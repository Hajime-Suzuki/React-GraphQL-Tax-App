import React from 'react'
import Routes from './routes/Routes'
import { GetUser } from './graphql/components/login'
import { LoadingIcon } from './view/UI/LoadingIcon'

class App extends React.Component {
  public render() {
    return (
      <GetUser.Component>
        {({ loading }) => {
          if (loading) return <LoadingIcon />
          return <Routes />
        }}
      </GetUser.Component>
    )
  }
}

export default App
