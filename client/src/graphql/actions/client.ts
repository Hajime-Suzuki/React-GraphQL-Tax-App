import { client } from '../client'
import {
  GetClientsListQuery,
  GetClientsListQueryVariables,
  GetClientsListDocument,
  ClientFragmentFragment
} from '../components/clients'

const readClientsList = () => {
  try {
    const { getClientsByUser } = client.readQuery<
      GetClientsListQuery,
      GetClientsListQueryVariables
    >({
      query: GetClientsListDocument
    })!

    return getClientsByUser || []
  } catch {
    return []
  }
}

const writeData = (data: GetClientsListQuery) => {
  client.writeQuery<GetClientsListQuery>({
    query: GetClientsListDocument,
    data
  })
}

////////////////////////////

const addClient = (clientData: ClientFragmentFragment) => {
  const clientsList = readClientsList()
  writeData({ getClientsByUser: [...clientsList, clientData] })
}

export const ClientAction = {
  addClient
}
