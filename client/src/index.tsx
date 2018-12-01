import { MuiThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { theme } from './styles/theme'
import store from './redux'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: 'http://localhost:4000'
})

// import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'

// import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'

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
    ,
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
