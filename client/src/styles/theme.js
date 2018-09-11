import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  typography: {
    fontFamily: ['Share Tech Mono', 'Cuprum'].join(',')
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
    },
    white: {
      main: '#fff'
    }
  },
  spacing: {
    unit: 8,
    unit2: 40
  },
  something: {
    name: 'theme something prop'
  }
})
