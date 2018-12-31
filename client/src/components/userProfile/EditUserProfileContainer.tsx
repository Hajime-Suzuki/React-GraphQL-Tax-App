import Button from '@material-ui/core/Button'
import { Form, Formik, FormikProps } from 'formik'
import * as React from 'react'
import { GetUserProfile } from 'src/graphql/components/userProfile'
import { PrivateRoutesChildProps } from 'src/routes/types'
import { renderFields } from '../project/formComponents/renderFields/renderFields'
import { LoadingIcon } from '../UI/LoadingIcon'

type Props = GetUserProfile.Props<PrivateRoutesChildProps>

class EditUserProfileContainer extends React.Component<Props> {
  render() {
    const { data } = this.props
    if (!data) return null
    const { loading, error, getUser } = data
    if (error) return <p>{error.message}</p>
    if (loading) return <LoadingIcon />
    if (!getUser) return 'user not found'
    const { clients, ...user } = getUser
    const { id: _, __typename: __, ...userInfo } = user
    return (
      <Formik
        initialValues={userInfo}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values: typeof userInfo) => console.log(values)}
        render={(props: FormikProps<typeof userInfo>) => {
          return (
            <Form>
              {generateSettings(userInfo).map((setting, i) => {
                return (
                  <React.Fragment key={i}>
                    {renderFields(setting)}
                  </React.Fragment>
                )
              })}
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Form>
          )
        }}
      />
    )
  }
}

const generateSettings = (userInfo: Partial<GetUserProfile.GetUser>) => {
  return Object.keys(userInfo)
    .filter(key => key !== '__typename' && key !== 'id')
    .map(key => {
      // if (key !== 'clients')
      return { name: key, label: key.charAt(0).toUpperCase() + key.slice(1) }
    })
}

export default GetUserProfile.HOC<Props>({
  options: props => ({ variables: { id: props.userId } })
})(EditUserProfileContainer)
