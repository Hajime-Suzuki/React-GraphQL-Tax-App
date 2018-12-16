import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import { Field, FieldArray, FormikHandlers } from 'formik'
import React from 'react'
import {
  renderFormikTextField,
  renderFormikArrayField
} from 'src/libs/forms/renderTextField'
import {
  AddProjectInitialValues,
  addProjectInitialValues
} from '../../AddProjectContainer'

interface Props {
  incomes?: AddProjectInitialValues['incomes']
  expenses?: AddProjectInitialValues['expenses']
  handleChange: FormikHandlers['handleChange']
}

const test = (index: any) => (props: any) =>
  renderFormikArrayField(props, index)

const renderFields = (type: 'incomes' | 'expenses', i: number) => {
  const fields = [
    { name: 'name', label: 'Name' },
    { name: 'price', label: 'Price' },
    { name: 'quantity', label: 'Quantity' }
  ]
  return fields.map((field, fieldIndex) => {
    return (
      <Grid item xs={12} md={3} key={fieldIndex}>
        <Field
          name={`${type}.${i}.${field.name}`}
          label={field.label}
          component={renderFormikTextField}
        />
      </Grid>
    )
  })
}

export const IncomesField: React.SFC<Props> = props => {
  const { incomes, handleChange } = props
  const type = incomes ? 'incomes' : 'expenses'
  const items = props[type]!

  return (
    <FieldArray
      name={type}
      render={arrayHelpers => {
        return (
          <Grid container style={{ textAlign: 'center', marginTop: '3em' }}>
            <Grid item xs={12}>
              <Typography variant="h5">
                {type === 'incomes' ? 'Incomes' : 'Expenses'}
              </Typography>
            </Grid>
            <Grid item container xs={12}>
              {items.map((item, i) => {
                return (
                  <Grid item xs={12} key={i} container justify="center">
                    {renderFields(type, i)}
                    {/* <Field name={`${type}.${i}.name`} component={test} /> */}
                    <Grid item>
                      <Select
                        value={item.taxRate}
                        name={`${type}.${i}.taxRate`}
                        onChange={handleChange}
                      >
                        <MenuItem value={0}>0%</MenuItem>
                        <MenuItem value={6}>6%</MenuItem>
                        <MenuItem value={21}>21%</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => arrayHelpers.remove(i)}>
                        <Icon className="far fa-trash-alt" />
                      </IconButton>
                    </Grid>
                  </Grid>
                )
              })}
            </Grid>

            <Grid item xs={12}>
              <IconButton
                onClick={() =>
                  arrayHelpers.push(addProjectInitialValues[type][0])
                }
              >
                <Icon className="fas fa-plus-circle" />
              </IconButton>
            </Grid>
          </Grid>
        )
      }}
    />
  )
}
