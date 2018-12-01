import * as React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { StyledGridFormItem } from 'src/styles/forms'
import Divider from '@material-ui/core/Divider'
import { LoginFn } from './loginQueryMutation'

interface Props {
  login: LoginFn
}
export default class LoginFormGQL extends React.Component<Props> {
  state = { email: '', password: '' }

  onChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  onSubmit = e => {
    console.log('subimt')
    e.preventDefault()
    const { email, password } = this.state
    this.props.login({ variables: { email, password } })
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <StyledGridFormItem container direction="column" alignItems="center">
            <TextField name="email" label="email" onChange={this.onChange} />
            <TextField
              type="password"
              name="password"
              label="password"
              onChange={this.onChange}
            />
            <Divider style={{ margin: '1em 0' }} />
            <Button variant="contained" color="primary" type="submit">
              submit
            </Button>
          </StyledGridFormItem>
        </form>
      </React.Fragment>
    )
  }
}
