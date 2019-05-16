import { client } from '../client'
import { ClientFragment, GetClientsList } from '../components/clients'

const readClientsList = () => {
  try {
    const { getClientsByUser } = client.readQuery<
      GetClientsList.Query,
      GetClientsList.Variables
    >({
      query: GetClientsList.Document
    })!

    return getClientsByUser || []
  } catch {
    return []
  }
}

const writeData = (data: GetClientsList.Query) => {
  client.writeQuery<GetClientsList.Query>({
    query: GetClientsList.Document,
    data
  })
}

////////////////////////////

const addClient = (clientData: ClientFragment.Fragment) => {
  const clientsList = readClientsList()
  writeData({ getClientsByUser: [...clientsList, clientData] })
}

export const ClientAction = {
  addClient
}
