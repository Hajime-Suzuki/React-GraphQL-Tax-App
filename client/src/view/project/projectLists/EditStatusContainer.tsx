import * as React from 'react'
import { InvoiceStatus } from 'src/graphql/components/login'
import { MutationFn, MutationResult } from 'react-apollo'
import {
  UpdateStatusComponent,
  UpdateStatusMutation,
  UpdateStatusMutationVariables
} from 'src/graphql/components/projects'
import { EditStatusDropdown } from './EditStatusDropDown'

interface Props {
  status: InvoiceStatus
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
