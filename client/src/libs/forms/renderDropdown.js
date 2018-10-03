import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import React, { PureComponent } from 'react'

export class renderDropdown extends PureComponent {
  render() {
    const {
      input,
      label,
      children,
      // meta: { touched, error, dirty },
      initialValue,
      ...custom
    } = this.props

    return (
      <Grid item className="item" xs={11}>
        <FormControl className={custom.className}>
          <InputLabel htmlFor={custom.className}>{label}</InputLabel>
          <Select
            {...input}
            {...custom}
            children={children}
            value={initialValue || input.value}
          />
        </FormControl>
      </Grid>
    )
  }
}
