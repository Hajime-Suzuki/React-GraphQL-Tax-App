import { IClientInput } from '../../@types/types'
import { ClientManager } from '../../client/domain/manager'

const getClientByCondition = async (userId: string, condition: IClientInput) =>
  ClientManager.getClientByCondition(userId, condition)

const updateClientProject = async (clientId: string, projectId: string) =>
  ClientManager.updateClientProject(clientId, projectId)

const addClient = async (userId: string, clientInput: IClientInput) =>
  ClientManager.addClient(userId, clientInput)

export const ProjectManager = {
  getClientByCondition,
  updateClientProject,
  addClient
}
