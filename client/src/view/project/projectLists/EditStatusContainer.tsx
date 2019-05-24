import * as React from 'react'
import { MutationFn, MutationResult } from 'react-apollo'
import {
  UpdateStatusComponent,
  UpdateStatusMutation,
  UpdateStatusMutationVariables,
  Invoice_Status
} from 'src/graphql/components/projects'
import { EditStatusDropdown } from './EditStatusDropDown'

interface Props {
  status: Invoice_Status
  projectId: string
}

export type EditStatusChildProps = Props & {
  onSubmit: MutationFn<UpdateStatusMutation, UpdateStatusMutationVariables>
  data?: MutationResult<UpdateStatusMutation>
}

class EditStatusContainer extends React.PureComponent<Props> {
  render() {
    const { status, projectId } = this.props

    return (
      <UpdateStatusComponent>
        {(update, data) => (
          <EditStatusDropdown
            status={status}
            projectId={projectId}
            onSubmit={update}
            data={data}
          />
        )}
      </UpdateStatusComponent>
    )
  }
}

export default EditStatusContainer
