import * as React from 'react'
import { PrivateRoutesChildProps } from 'src/routes/types'
import { GetUserProfile } from 'src/graphql/components/userProfile'
import { LoadingIcon } from '../UI/LoadingIcon'

type Props = GetUserProfile.Props<PrivateRoutesChildProps>

class EditUserProfileContainer extends React.Component<Props> {
  render() {
    console.log(this.props)
    const { data } = this.props
    if (!data) return null
    const { loading, error, getUser } = data
    if (error) return <p>{error.message}</p>
    if (loading) return <LoadingIcon />
    if (!getUser) return 'Error!'
    return (
      <div>
        {getUser.firstName} {getUser.lastName}
      </div>
    )
  }
}

export default GetUserProfile.HOC<Props>({
  options: props => {
    console.log({ props })
    return { variables: { id: props.userId } }
  }
})(EditUserProfileContainer)
