import * as React from 'react'
import { InvoiceStatus } from 'src/graphql/components/login'
import { MutationFn, MutationResult } from 'react-apollo'
import { UpdateStatus } from 'src/graphql/components/projects'
import { EditStatusDropdown } from './EditStatusDropDown'

interface Props {
  status: InvoiceStatus
  projectId: string
}

export type EditStatusChildProps = Props & {
  onSubmit: MutationFn<UpdateStatus.Mutation, UpdateStatus.Variables>;
  data?: MutationResult<UpdateStatus.Mutation>;
}

class EditStatusContainer extends React.PureComponent<Props> {
  render() {
    const { status, projectId } = this.props

    return (
      <UpdateStatus.Component>
        {(update, data) => (
          <EditStatusDropdown
            status={status}
            projectId={projectId}
            onSubmit={update}
            data={data}
          />
        )}
      </UpdateStatus.Component>
    )
  }
}

export default EditStatusContainer
