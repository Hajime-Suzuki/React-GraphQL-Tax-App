import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { FormikProps } from 'formik'
import * as React from 'react'
import { MutationResult } from 'react-apollo'
import { QGetUserProfile } from 'src/graphql/@types/types'
import { UpdateUserMutation } from 'src/graphql/components/userProfile'
import { renderFields } from 'src/libs/forms/renderFields/renderFields'
import { Styles } from 'src/styles/sharedStyles'
import { EditUserInfoFormValues } from './EditUserProfileContainer'

interface OwnProps {
  userInfo: EditUserInfoFormValues
}

type Props = OwnProps &
  FormikProps<EditUserInfoFormValues> &
  MutationResult<UpdateUserMutation>

const EditUserProfile: React.FC<Props> = props => {
  const {
    userInfo,
    dirty,
    isSubmitting,
    error: mutationError,
    loading: mutationLoading,
    data
  } = props
  return (
    <Styles.Form>
      <div className="form-section">
        {generateSettings(userInfo).map((setting, i) => {
          return (
            <React.Fragment key={i}>{renderFields(setting)}</React.Fragment>
          )
        })}
      </div>
      <div className="form-section">
        {data && data.updateUser.message && (
          <Typography color="primary" variant="subtitle1" gutterBottom>
            {data.updateUser.message}
          </Typography>
        )}
        {mutationError && (
          <Typography color="error" variant="subtitle1" gutterBottom>
            {mutationError.message}
          </Typography>
        )}
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!dirty || isSubmitting || mutationLoading}
          >
            Submit
          </Button>
        </div>
      </div>
    </Styles.Form>
  )
}

const generateSettings = (userInfo: Partial<QGetUserProfile>) => {
  return Object.keys(userInfo)
    .filter(key => key !== '__typename' && key !== 'id')
    .map(key => {
      return { name: key, label: key.charAt(0).toUpperCase() + key.slice(1) }
    })
}

export default EditUserProfile
