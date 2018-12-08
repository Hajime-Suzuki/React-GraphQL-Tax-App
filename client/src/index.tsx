import { MuiThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import store from './redux'
import registerServiceWorker from './registerServiceWorker'
import { theme } from './styles/theme'
import { client } from './graphql/client'

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
          <App />
          {/* </MuiPickersUtilsProvider> */}
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
