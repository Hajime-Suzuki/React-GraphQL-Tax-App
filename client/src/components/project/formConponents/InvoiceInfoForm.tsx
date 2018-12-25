import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Form, FormikProps } from 'formik'
import * as React from 'react'
import { Styles } from 'src/styles/sharedStyles'
import styled from 'styled-components'
import { IncomesAndExpenseFields } from './IncomesAndExpenseFields'
import { renderFields } from './renderFields/renderFields'
import { GenerateFieldSettings } from '../helper/genrateFieldSettings'
import { ProjectInput } from 'src/graphql/components/projects'

interface OwnProps {
  error: string
  loading: boolean
  successMessage?: string | null
}

class InvoiceInfoForm extends React.Component<
  FormikProps<ProjectInput> & OwnProps
> {
  render() {
    const {
      isSubmitting,
      handleChange,
      values,
      error,
      loading,
      successMessage
    } = this.props
    const { incomes, expenses } = values
    return (
      <StyledForm>
        <div className="form-section">
          <Typography variant="h5" className="title">
            Basic Info
          </Typography>
          {GenerateFieldSettings.generalFields.map((field, i) => (
            <React.Fragment key={i}>{renderFields(field)}</React.Fragment>
          ))}
        </div>
        <div className="form-section">
          <Typography variant="h5" className="title">
            Client Info
          </Typography>
          {GenerateFieldSettings.clientFields.map((field, i) => (
            <React.Fragment key={i}>{renderFields(field)}</React.Fragment>
          ))}
        </div>
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
        {error && (
          <Typography color="error" variant="h6" gutterBottom>
            {error}
          </Typography>
        )}
        {successMessage && (
          <Typography color="primary" variant="h6" gutterBottom>
            {successMessage}
          </Typography>
        )}
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
      </StyledForm>
    )
  }
}

export const StyledForm = styled(Form)`
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
