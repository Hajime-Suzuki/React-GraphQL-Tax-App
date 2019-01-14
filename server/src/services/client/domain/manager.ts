import { ClientQueries } from './queries'
import { IClientInput } from '../../@types/types'
import { ClientCommands } from './commands'

const getClientByCondition = async (userId: string, data: IClientInput) =>
  ClientQueries.getClientByCondition(userId, data)

const updateClientProject = async (clientId: string, projectId: string) =>
  ClientCommands.updateClientProject(clientId, projectId)

const addClient = async (userId: string, clientInput: IClientInput) =>
  ClientCommands.addClient(userId, clientInput)

export const ClientManager = {
  getClientByCondition,
  updateClientProject,
  addClient
}
