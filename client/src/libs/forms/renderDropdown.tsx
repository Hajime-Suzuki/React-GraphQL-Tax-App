import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import * as React from 'react'
import MenuItem from '@material-ui/core/MenuItem'

export const renderDropdown: React.SFC<any> = props => {
  const {
    input,
    label,
    children,
    // meta: { touched, error, dirty },
    initialValue,
    ...custom
  } = props

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

interface RenderStateMenuItemArgs {
  value: string | number | undefined
  name: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  id?: string
}

export const StatusField = ({
  value,
  name,
  onChange,
  ...rest
}: RenderStateMenuItemArgs) => {
  return (
    <Select value={value} name={name} onChange={onChange} {...rest}>
      <MenuItem value={0}>0%</MenuItem>
      <MenuItem value={6}>6%</MenuItem>
      <MenuItem value={21}>21%</MenuItem>
    </Select>
  )
}
