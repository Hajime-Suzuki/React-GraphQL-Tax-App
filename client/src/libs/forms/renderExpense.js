import { MenuItem } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import React, { Component } from 'react'
import { Field } from 'redux-form'
import { renderDropdown } from './renderDropdown'
import { renderTextField } from './renderTextField'

export class renderExpenseAndIncome extends Component {
  componentDidMount() {
    const { defaultValues, fields } = this.props

    // if there are defaults, push it to the field array
    if (defaultValues) {
      defaultValues.toJS().map(v => {
        return fields.push(v)
      })
    }
  }

  render() {
    const { fields } = this.props

    const type = fields.name
    const text = type === 'expenses' ? 'Expenses' : 'Incomes'

    return (
      <Grid item xs={11} container justify="center">
        <Grid item xs={11}>
          <Typography variant="subheading">{text}</Typography>
        </Grid>
        {fields.map((item, i) => {
          return (
            <Grid key={i} item xs={11} container justify="center">
              <Grid item xs={11}>
                <Typography variant="subheading">{`${text} ${i +
                  1}`}</Typography>
                <IconButton onClick={() => fields.remove(i)}>
                  <Icon className="far fa-trash-alt" />
                </IconButton>
              </Grid>
              <Field
                name={`${item}.name`}
                label="Name"
                component={renderTextField}
              />
              <Field
                name={`${item}.price`}
                label="Price(excl)"
                component={renderTextField}
              />
              <Field
                name={`${item}.quantity`}
                label="Qualtity"
                component={renderTextField}
              />
              <Field
                name={`${item}.taxRate`}
                label="Rate"
                component={renderDropdown}
              >
                <MenuItem value={0}>0%</MenuItem>
                <MenuItem value={6}>6%</MenuItem>
                <MenuItem value={21}>21%</MenuItem>
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
}
