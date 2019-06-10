import { createSelector } from 'reselect'
import { ProjectInput } from 'src/graphql/components/projects'
import { AddProjectChildProps } from '.'

interface GetSelectedClientSelectorArgs {
  clientsList: AddProjectChildProps['clients']
  clientFormInput?: ProjectInput['client']
}
export const getSelectedClient = createSelector(
  [
    ({ clientsList }: GetSelectedClientSelectorArgs) => clientsList,
    ({ clientFormInput }: GetSelectedClientSelectorArgs) => clientFormInput
  ],
  (clients, clientFormInput) => {
    if (!clients || !clientFormInput) return undefined
    return clients.find(client => client.id === clientFormInput.id)
  }
)
