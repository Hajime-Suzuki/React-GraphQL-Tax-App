import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import { FieldArray, Form, FormikProps } from 'formik'
import * as React from 'react'
import styled from 'styled-components'
import {
  AddProjectInitialValues,
  addProjectInitialValues
} from '../../AddProjectContainer'
import { renderFields } from '../../helper/renderFields'

interface Props {
  handleSubmit: any
}

class InvoiceInfoForm extends React.PureComponent<
  Props & FormikProps<AddProjectInitialValues>
> {
  render() {
    return (
      <StyledForm>
        <div className="form-section">
          <Typography variant="h5" className="title">
            Basic Info
          </Typography>
          {fields.map((field, i) => (
            <React.Fragment key={i}>{renderFields(field)}</React.Fragment>
          ))}
        </div>

        <div className="form-section">
          <Typography variant="h5" className="title">
            Contact Person
          </Typography>
          {contactPersonFields.map((field, i) => (
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
          <Button type="submit" variant="contained" color="primary">
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
              {items.map((item, i) => {
                return (
                  <React.Fragment key={i}>
                    {generateArrayFields(type, i).map((field, i) => (
                      <React.Fragment key={i}>
                        {renderFields(field)}
                      </React.Fragment>
                    ))}
                    <div className="field-item select">
                      <InputLabel htmlFor="tax-rate">Age</InputLabel>
                      <Select
                        value={item.taxRate}
                        name={`${type}.${i}.taxRate`}
                        id="tax-rate"
                        onChange={handleChange}
                      >
                        <MenuItem value={0}>0%</MenuItem>
                        <MenuItem value={6}>6%</MenuItem>
                        <MenuItem value={21}>21%</MenuItem>
                      </Select>
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
                <Icon className="fas fa-plus-circle" />
              </IconButton>
            </React.Fragment>
          )
        }}
      />
    )
  }
}

const fields = [
  { name: 'invoiceNumber', label: 'Invoice Number' },
  { name: 'projectDate', label: 'Project Date' },
  { name: 'invoiceDate', label: 'Invoice Date' },
  { name: 'name', label: 'Name' }
]

const contactPersonFields = [
  { name: 'contactPerson.name', label: 'Name' },
  { name: 'contactPerson.email', label: 'Email' },
  { name: 'contactPerson.address', label: 'Address' },
  { name: 'contactPerson.phone', label: 'Phone' }
]

const generateArrayFields = (type: 'incomes' | 'expenses', i) => [
  { name: `${type}.${i}.name`, label: 'Name' },
  { name: `${type}.${i}.price`, label: 'Price' },
  { name: `${type}.${i}.quantity`, label: 'Quantity' }
]

const StyledForm = styled(Form)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .form-section {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
