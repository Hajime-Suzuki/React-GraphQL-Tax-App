import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import { FieldArray } from 'formik'
import * as React from 'react'
import { StatusField } from 'src/components/project/formConponents/renderFields/renderDropdown'
import { ProjectInput } from 'src/graphql/components/projects'
import { GenerateFieldSettings } from '../helper/genrateFieldSettings'
import { renderFields } from './renderFields/renderFields'

interface IncomesAndExpenseFieldsProps {
  type: 'incomes' | 'expenses'
  handleChange: (e: React.ChangeEvent<any>) => void
  values: Partial<ProjectInput>
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
                arrayHelpers.push({
                  name: '',
                  price: '0',
                  quantity: 1,
                  taxRate: 21
                })
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
