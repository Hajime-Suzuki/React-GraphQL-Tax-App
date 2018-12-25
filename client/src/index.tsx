import { MuiThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { client } from './graphql/client'
import registerServiceWorker from './registerServiceWorker'
import { theme } from './styles/theme'

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
        <App />
        {/* </MuiPickersUtilsProvider> */}
      </MuiThemeProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
