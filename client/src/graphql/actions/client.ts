import { client } from '../client'
import { GetSingleProject } from '../components/projects'
import { SingleClient } from '../components/clients'
const attachClientToProject = (clientId: string, projectId: string) => {
  const data = client.readQuery<
    GetSingleProject.Query,
    GetSingleProject.Variables
  >({
    query: GetSingleProject.Document,
    variables: { id: projectId }
  })
  const clientData = client.readQuery<
    SingleClient.Query,
    SingleClient.Variables
  >({ query: SingleClient.Document, variables: { id: clientId } })
  console.log(clientId)

  client.writeQuery({
    query: GetSingleProject.Document,
    data: { ...data, client: clientData }
  })

  console.log(test)
}

export const ClientAction = {
  attachClientToProject
}
