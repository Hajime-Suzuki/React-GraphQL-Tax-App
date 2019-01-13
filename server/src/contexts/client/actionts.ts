import { ClientRepository } from './repository'
import { IClientInput } from '../@types/types'
import { ClientDomain } from './domain'
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

const addClient = async (userId: string, data: IClientInput) => {
  const client = await ClientDomain.addClient(userId, data)
  if (!client) throw new ApolloError('client could not be created')
  return client
}

const updateClient = async (
  clientId: string,
  userId: string,
  data: IClientInput
) =>
  ClientDomain.updateClient({
    clientId,
    userId,
    data
  })

const updateClientProject = async (
  clientId: string | null | undefined,
  projectId: string
) => {
  if (!clientId) throw new ApolloError('client id must be provided')
  const client = ClientDomain.updateClientProject(clientId, projectId)
  return client
}

const deleteClient = async (clientId: string) =>
  await ClientDomain.deleteClient(clientId)

export const ClientActions = {
  getClientsByUser,
  getSingleClient,
  getClientByProject,
  addClient,
  updateClient,
  updateClientProject,
  deleteClient
}
