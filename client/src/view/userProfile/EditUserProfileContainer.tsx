import { Formik, FormikActions, FormikProps } from 'formik'
import * as React from 'react'
import { MutationFn } from 'react-apollo'
import { GetUserProfile, UpdateUser } from 'src/graphql/components/userProfile'
import { Omit } from 'src/libs/types'
import { PrivateRoutesChildProps } from 'src/routes/types'
import { LoadingIcon } from '../UI/LoadingIcon'
import EditUserProfile from './EditUserPorfile'

type Props = GetUserProfile.Props<PrivateRoutesChildProps>

export type EditUserInfoFormValues = Omit<
  GetUserProfile.GetUser,
  '__typename' | 'clients' | 'id'
>

class EditUserProfileContainer extends React.Component<Props> {
  handleSubmit = (
    mutate: MutationFn<UpdateUser.Mutation, UpdateUser.Variables>
  ) => async (
    values: EditUserInfoFormValues,
    { resetForm }: FormikActions<EditUserInfoFormValues>
  ) => {
    const res = await mutate({ variables: { data: values } })
    const user = res && res.data && res.data.updateUser.user
    if (user) {
      const { __typename, id, clients, ...userInfo } = user
      resetForm(userInfo)
    }
  }
  render() {
    const { data } = this.props
    if (!data) return null
    const { loading, error, getUser } = data
    if (error) return <p>{error.message}</p>
    if (loading) return <LoadingIcon />
    if (!getUser) return 'user not found'
    const { __typename: _, id: __, clients, ...userInfo } = getUser
    return (
      <UpdateUser.Component>
        {(updateUser, mutationResult) => {
          return (
            <Formik
              initialValues={userInfo}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={this.handleSubmit(updateUser)}
              render={(props: FormikProps<EditUserInfoFormValues>) => {
                return (
                  <EditUserProfile
                    userInfo={userInfo}
                    {...props}
                    {...mutationResult}
                  />
                )
              }}
            />
          )
        }}
      </UpdateUser.Component>
    )
  }
}

export default GetUserProfile.HOC<Props>({})(EditUserProfileContainer)
