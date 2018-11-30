import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'

import { theme } from './styles/theme'
import store from './redux'

// import { MuiPickersUtilsProvider } from 'material-ui-pickers'

// import DateFnsUtils from '@date-io/date-fns'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        {/* <MuiPickersUtilsProvider> */}
        <App />
        {/* </MuiPickersUtilsProvider> */}
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
