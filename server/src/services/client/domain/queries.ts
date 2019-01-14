import { ClientRepository } from '../repository'
import { IClientInput } from '../../@types/types'
import { ClientCommands } from './commands'
import { ApolloError } from 'apollo-server-koa'

const getClientsByUser = async (userId: string) => {
  return ClientRepository.findByUserId(userId)
}

const getSingleClient = async (clientId: string) => {
  return ClientRepository.findById(clientId)
}
const getClientByProject = async (projectId: string) => {
  return ClientRepository.findByProjectId(projectId)
}

export const ClientQueries = {
  getClientsByUser,
  getSingleClient,
  getClientByProject
}
