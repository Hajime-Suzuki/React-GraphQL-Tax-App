import { IClientInput } from '../../@types/types'
import { ClientRepository } from '../repository'

const getClientsByUser = async (userId: string) => {
  return ClientRepository.findByUserId(userId)
}

const getClientById = async (clientId: string) => {
  return ClientRepository.findById(clientId)
}
const getClientByProject = async (projectId: string) => {
  return ClientRepository.findByProjectId(projectId)
}

const getClientByCondition = async (userId: string, data: IClientInput) => {
  return ClientRepository.findByCondition(userId, data)
}
export const ClientQueries = {
  getClientsByUser,
  getClientById,
  getClientByProject,
  getClientByCondition
}
