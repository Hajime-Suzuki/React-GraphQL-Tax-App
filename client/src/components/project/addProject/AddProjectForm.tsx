import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { FormikProps } from 'formik'
import * as React from 'react'
import { ProjectInput } from 'src/graphql/components/projects'
import { renderDatePicker } from 'src/libs/forms/renderFields/renderDatePicker'
import { renderFields } from 'src/libs/forms/renderFields/renderFields'
import { Styles } from 'src/styles/sharedStyles'
import styled from 'styled-components'
import { AddProjectChildProps } from '.'
import { IncomesAndExpenseFields } from '../formComponents/IncomesAndExpenseFields'
import { GenerateFieldSettings } from '../helper/genrateFieldSettings'
import SelectClient from './components/SelectClient'
import SelectedClientCard from './components/SelectedClientCard'

type Props = FormikProps<ProjectInput> & AddProjectChildProps

class AddProjectForm extends React.Component<Props> {
  unselectClient = () => {
    this.props.setFieldValue('client.id', null)
  }

  render() {
    const {
      isSubmitting,
      values,
      errors: validationErrors,
      loading,
      setFieldValue
    } = this.props

    return (
      <CustomForm>
        <div className="form-section">
          <Typography variant="h5" className="title">
            Basic Info
          </Typography>
          {GenerateFieldSettings.generalFields.map((field, i) => {
            if (field.type === 'date') {
              return (
                <React.Fragment key={i}>
                  {renderDatePicker({
                    field,
                    values,
                    setFieldValue,
                    error: validationErrors[field.name]
                  })}
                </React.Fragment>
              )
            }
            return (
              <React.Fragment key={i}>{renderFields(field)}</React.Fragment>
            )
          })}
        </div>
        <this.ClientSection />
        <this.IncomesAndExpensesSection />
        <this.MessageSection />
        <div className="form-section">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting && loading}
          >
            Submit
          </Button>
        </div>
      </CustomForm>
    )
  }

  ClientSection = () => {
    const { setFieldValue, clients, selectedClient } = this.props

    return (
      <div className="form-section">
        <Typography variant="h5" className="title client-title">
          Client Info
        </Typography>
        {clients && (
          <SelectClient clients={clients} setFieldValue={setFieldValue} />
        )}
        <div className="button-spacer" />
        <Button
          variant="outlined"
          color="primary"
          onClick={this.unselectClient}
          disabled={!selectedClient}
        >
          Add New Client
        </Button>
        {!selectedClient && (
          <div style={{ width: '100%' }} className="form-section">
            {GenerateFieldSettings.clientFields.map((field, i) => (
              <React.Fragment key={i}>{renderFields(field)}</React.Fragment>
            ))}
          </div>
        )}
        <SelectedClientCard
          selectedClient={selectedClient}
          unselectClient={this.unselectClient}
        />
      </div>
    )
  }

  IncomesAndExpensesSection = () => {
    const { values, handleChange } = this.props
    const { incomes, expenses } = values
    return (
      <React.Fragment>
        {incomes && (
          <div className="form-section">
            <Typography variant="h5" className="title">
              Incomes
            </Typography>
            <IncomesAndExpenseFields
              type="incomes"
              handleChange={handleChange}
              values={values}
            />
          </div>
        )}
        {expenses && (
          <div className="form-section">
            <Typography variant="h5" className="title">
              Expenses
            </Typography>
            <IncomesAndExpenseFields
              type="expenses"
              handleChange={handleChange}
              values={values}
            />
          </div>
        )}
      </React.Fragment>
    )
  }
  MessageSection = () => {
    const {
      mutationError,
      touched,
      successMessage,
      errors: validationErrors
    } = this.props

    const isTouched = !!Object.keys(touched).length
    return (
      <div className="message-section">
        {!mutationError && !isTouched && (
          <Typography color="error" variant="h6">
            {mutationError}
          </Typography>
        )}
        {successMessage && !isTouched && (
          <Typography color="primary" variant="h6">
            {successMessage}
          </Typography>
        )}
        {!!Object.keys(validationErrors).length && (
          <Typography color="error" variant="h6">
            {console.log(validationErrors)}
            You have invalid value(s)
          </Typography>
        )}
      </div>
    )
  }
}

const CustomForm = styled(Styles.Form)`
  .client-title {
    margin-bottom: 2em;
  }
  .button-spacer {
    margin: 0 1em;
  }
`

export default AddProjectForm
