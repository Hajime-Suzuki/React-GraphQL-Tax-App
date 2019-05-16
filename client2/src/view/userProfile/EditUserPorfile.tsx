import * as React from 'react'
import Button from '@material-ui/core/Button'
import { GetUserProfile, UpdateUser } from 'src/graphql/components/userProfile'
import { FormikProps } from 'formik'
import { EditUserInfoFormValues } from './EditUserProfileContainer'
import { Styles } from 'src/styles/sharedStyles'
import { MutationResult } from 'react-apollo'
import Typography from '@material-ui/core/Typography'
import { renderFields } from 'src/libs/forms/renderFields/renderFields'

interface OwnProps {
  userInfo: EditUserInfoFormValues
}

type Props = OwnProps &
  FormikProps<EditUserInfoFormValues> &
  MutationResult<UpdateUser.Mutation>

const EditUserProfile: React.FunctionComponent<Props> = props => {
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
          <Typography color="primary" variant="subheading" gutterBottom>
            {data.updateUser.message}
          </Typography>
        )}
        {mutationError && (
          <Typography color="error" variant="subheading" gutterBottom>
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

const generateSettings = (userInfo: Partial<GetUserProfile.GetUser>) => {
  return Object.keys(userInfo)
    .filter(key => key !== '__typename' && key !== 'id')
    .map(key => {
      // if (key !== 'clients')
      return { name: key, label: key.charAt(0).toUpperCase() + key.slice(1) }
    })
}

export default EditUserProfile
