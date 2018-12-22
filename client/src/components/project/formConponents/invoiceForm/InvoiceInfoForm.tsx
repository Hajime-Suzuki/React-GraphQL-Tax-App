import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import { FieldArray, Form, FormikProps } from 'formik'
import * as React from 'react'
import { AddProjectInput } from 'src/graphql/components/projects'
import { StatusField } from 'src/libs/forms/renderDropdown'
import styled from 'styled-components'
import { addProjectInitialValues } from '../../AddProjectContainer'
import { renderFields } from '../../helper/renderFields'
import { Styles } from 'src/styles/sharedStyles'

class InvoiceInfoForm extends React.PureComponent<
  FormikProps<AddProjectInput>
> {
  render() {
    const { isSubmitting } = this.props
    return (
      <StyledForm>
        <div className="form-section">
          <Typography variant="h5" className="title">
            Basic Info
          </Typography>
          {generalFields.map((field, i) => (
            <React.Fragment key={i}>{renderFields(field)}</React.Fragment>
          ))}
        </div>

        <div className="form-section">
          <Typography variant="h5" className="title">
            Client Info
          </Typography>
          {clientFields.map((field, i) => (
            <React.Fragment key={i}>{renderFields(field)}</React.Fragment>
          ))}
        </div>

        <div className="form-section">
          <Typography variant="h5" className="title">
            Incomes
          </Typography>
          {this.incomesAndExpenseFields('incomes')}
        </div>

        <div className="form-section">
          <Typography variant="h5" className="title">
            Expenses
          </Typography>
          {this.incomesAndExpenseFields('expenses')}
        </div>

        <div className="form-section">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </StyledForm>
    )
  }

  incomesAndExpenseFields = (type: 'incomes' | 'expenses') => {
    const { handleChange, values } = this.props
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
                      {generateArrayFields(type, i).map((field, i) => (
                        <React.Fragment key={i}>
                          {renderFields(field)}
                        </React.Fragment>
                      ))}
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
}

const generalFields = [
  { name: 'invoiceNumber', label: 'Invoice Number' },
  { name: 'projectDate', label: 'Project Date' },
  { name: 'invoiceDate', label: 'Invoice Date' },
  { name: 'name', label: 'Name' }
]

const clientFields = [
  { name: 'client.firstName', label: 'First Name' },
  { name: 'client.lastName', label: 'Last Name' },
  { name: 'client.email', label: 'Email' },
  { name: 'client.phone', label: 'Phone' },
  { name: 'client.address', label: 'Address' },
  { name: 'client.postalCode', label: 'Postal Code' }
]

const generateArrayFields = (type: 'incomes' | 'expenses', index: number) => [
  { name: `${type}.${index}.name`, label: 'Name' },
  { name: `${type}.${index}.price`, label: 'Price', type: 'number' },
  { name: `${type}.${index}.quantity`, label: 'Quantity', type: 'number' }
]

const StyledForm = styled(Form)`
  ${Styles.flexContainerProps}
  .form-section {
    ${Styles.flexContainerProps}
    width: 90%;
    margin-bottom: 4em;
    .title {
      width: 100%;
      text-align: center;
    }
    .field-item {
      width: 188px;
      margin: 1em;
      &.select {
        display: flex;
        flex-direction: column;
      }
    }
    .add-icon {
      width: 100%;
      text-align: center;
    }
  }
`

export default InvoiceInfoForm
