import { MuiThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { client } from './graphql/client'
import registerServiceWorker from './registerServiceWorker'
import { theme } from './styles/theme'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <App />
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </BrowserRouter>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
