import * as React from 'react'
import { GetToken } from 'src/graphql/components/client/login'
import { IRouterComponentProps } from 'src/routes/types'

type Props = GetToken.Props<IRouterComponentProps>

class EditUserProfileContainer extends React.Component<Props> {
  render() {
    return 'test'
  }
}

export default GetToken.HOC({})(EditUserProfileContainer)
