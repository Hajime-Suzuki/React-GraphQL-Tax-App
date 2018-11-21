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

import * as MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'

import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
