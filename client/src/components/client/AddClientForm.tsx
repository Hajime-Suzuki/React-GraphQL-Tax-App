import Button from '@material-ui/core/Button'
import * as React from 'react'
import { renderFields } from 'src/libs/forms/renderFields/renderFields'
import { Styles } from 'src/styles/sharedStyles'
import { GenerateFieldSettings } from '../project/helper/genrateFieldSettings'
import { AddClientFormChildProps } from './AddClientFormContainer'

const AddClientForm: React.FunctionComponent<
  AddClientFormChildProps
> = props => {
  const { handleSubmit } = props
  return (
    <Styles.Form>
      <div style={{ width: '100%' }} className="form-section">
        {GenerateFieldSettings.clientFields.map((field, i) => (
          <React.Fragment key={i}>{renderFields(field)}</React.Fragment>
        ))}
      </div>
      <Button onClick={handleSubmit as any} variant="contained" color="primary">
        Submit
      </Button>
    </Styles.Form>
  )
}

export default AddClientForm
