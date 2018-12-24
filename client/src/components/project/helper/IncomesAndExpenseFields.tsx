import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import { FieldArray } from 'formik'
import * as React from 'react'
import { AddProjectInput } from 'src/graphql/@types/types'
import { StatusField } from 'src/libs/forms/renderDropdown'
import { addProjectInitialValues } from '../AddProjectContainer'
import { GenerateFieldSettings } from './genrateFieldSettings'
import { renderFields } from './renderFields'

interface IncomesAndExpenseFieldsProps {
  type: 'incomes' | 'expenses'
  handleChange: (e: React.ChangeEvent<any>) => void
  values: AddProjectInput
}
export const IncomesAndExpenseFields: React.SFC<
  IncomesAndExpenseFieldsProps
> = props => {
  const { handleChange, values, type } = props
  const items = values[type]

  return (
    <FieldArray
      name={type}
      render={arrayHelpers => {
        return (
          <React.Fragment>
            {items &&
              items.map((item, i) => {
                return (
                  <React.Fragment key={i}>
                    {GenerateFieldSettings.generateArrayFields(type, i).map(
                      (field, i) => (
                        <React.Fragment key={i}>
                          {renderFields(field)}
                        </React.Fragment>
                      )
                    )}
                    <div className="field-item select">
                      <InputLabel htmlFor="tax-rate">Tax Rate</InputLabel>
                      <StatusField
                        value={item.taxRate === null ? '' : item.taxRate}
                        name={`${type}.${i}.taxRate`}
                        id="tax-rate"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="add-icon">
                      <IconButton onClick={() => arrayHelpers.remove(i)}>
                        <Icon className="far fa-trash-alt" />
                      </IconButton>
                    </div>
                  </React.Fragment>
                )
              })}
            <IconButton
              style={{ marginTop: '1em' }}
              onClick={() =>
                arrayHelpers.push(addProjectInitialValues.incomes[0])
              }
            >
              <Icon className="fas fa-plus-circle" color="secondary" />
            </IconButton>
          </React.Fragment>
        )
      }}
    />
  )
}
