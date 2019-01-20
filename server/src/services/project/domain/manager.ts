import { IClientInput } from '../../@types/types'
import { ClientCommands } from '../../client/domain/commands'
import { ClientQueries } from '../../client/domain/queries'

const getClientByCondition = async (userId: string, data: IClientInput) =>
  ClientQueries.getClientByCondition(userId, data)

const updateClientProject = async (clientId: string, projectId: string) =>
  ClientCommands.updateClientProject(clientId, projectId)

const addClient = async (
  userId: string,
  clientInput: IClientInput,
  projectId: string
) => {
  try {
    const newClient = await ClientCommands.addClient(userId, clientInput)
    if (!newClient) throw new Error('couldn\'t create client')
    const updatedClient = await updateClientProject(newClient.id, projectId)
    return updatedClient
  } catch (e) {
    throw e
  }
}

export const ProjectManager = {
  getClientByCondition,
  updateClientProject,
  addClient
}
