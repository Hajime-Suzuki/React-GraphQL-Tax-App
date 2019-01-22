import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { renderFields } from 'src/libs/forms/renderFields/renderFields'
import { Styles } from 'src/styles/sharedStyles'
import { GenerateFieldSettings } from '../project/helper/genrateFieldSettings'
import { AddClientFormChildProps } from './AddClientFormContainer'

const AddClientForm: React.FunctionComponent<
  AddClientFormChildProps
> = props => {
  console.log(props.errors)
  const {
    handleSubmit,
    mutationProps: { error },
    errors: validationErrors
  } = props
  return (
    <Styles.Form>
      <div style={{ width: '100%' }} className="form-section">
        {GenerateFieldSettings.clientFields.map((field, i) => (
          <React.Fragment key={i}>{renderFields(field)}</React.Fragment>
        ))}
      </div>
      <div className="message-section">
        {error && (
          <Typography color="error" variant="h6">
            {error.message}
          </Typography>
        )}
        {!!Object.keys(validationErrors).length && (
          <Typography color="error" variant="h6">
            {console.log(validationErrors)}
            You have invalid value(s)
          </Typography>
        )}
      </div>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Button
          onClick={handleSubmit as any}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </div>
    </Styles.Form>
  )
}

export default AddClientForm
