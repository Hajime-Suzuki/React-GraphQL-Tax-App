import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { FormikProps } from 'formik'
import * as React from 'react'
import { ProjectInput } from 'src/graphql/components/projects'
import { Styles } from 'src/styles/sharedStyles'
import { IncomesAndExpenseFields } from './formComponents/IncomesAndExpenseFields'
import { renderDatePicker } from './formComponents/renderFields/renderDatePicker'
import { renderFields } from './formComponents/renderFields/renderFields'
import { GenerateFieldSettings } from './helper/genrateFieldSettings'

interface OwnProps {
  mutationError?: string
  loading: boolean
  successMessage?: string | null
}

class AddProjectForm extends React.Component<
  FormikProps<ProjectInput> & OwnProps
> {
  render() {
    const {
      isSubmitting,
      handleChange,
      values,
      mutationError,
      errors: validationErrors,
      loading,
      touched,
      setFieldValue,
      successMessage
    } = this.props
    const { incomes, expenses } = values
    const isTouched = !!Object.keys(touched).length
    return (
      <Styles.Form>
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
      </Styles.Form>
    )
  }
}

export default AddProjectForm
