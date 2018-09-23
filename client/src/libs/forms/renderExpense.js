import { MenuItem } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { Field } from 'redux-form'
import { renderDropdown } from './renderDropdown'
import { renderTextField } from './renderTextField'

export const renderExpense = ({ fields }) => {
  return (
    <Grid item xs={11} container justify="center">
      <Grid item xs={11}>
        <Typography variant="subheading">Expenses</Typography>
      </Grid>
      {fields.map((expense, i) => {
        return (
          <Grid key={i} item xs={11} container justify="center">
            <Grid item xs={11}>
              <Typography variant="subheading">{`Expense ${i + 1}`}</Typography>
              <IconButton onClick={() => fields.remove(i)}>
                <Icon className="far fa-trash-alt" />
              </IconButton>
            </Grid>
            <Field
              name={`${expense}.name`}
              label="Name"
              component={renderTextField}
            />
            <Field
              name={`${expense}.price`}
              label="Price"
              component={renderTextField}
            />

            <Field
              component={renderDropdown}
              name={`${expense}.rate`}
              label="Rate"
            >
              <MenuItem value="0">0%</MenuItem>
              <MenuItem value="6">6%</MenuItem>
              <MenuItem value="21">21%</MenuItem>
            </Field>
          </Grid>
        )
      })}
      <Grid item xs={11}>
        <IconButton onClick={() => fields.push({})}>
          <Icon className="fas fa-plus-circle" />
        </IconButton>
      </Grid>
    </Grid>
  )
}
