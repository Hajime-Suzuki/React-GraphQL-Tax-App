import { createSelector } from 'reselect'
import { GetClientsList } from 'src/graphql/components/clients'
import { ProjectInput } from 'src/graphql/components/projects'

interface GetSelectedClientSelectorArgs {
  clientsList?: GetClientsList.GetClientsByUser[] | null
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
