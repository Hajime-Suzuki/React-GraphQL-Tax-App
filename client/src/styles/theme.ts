import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  typography: {
    fontFamily: ['Share Tech', 'Cuprum'].join(',')
  },
  palette: {
    primary: {
      main: '#26a69a'
    },
    secondary: {
      main: '#ffa726'
    },
    error: {
      main: '#ef5350'
    }
  },
  spacing: 8
})
