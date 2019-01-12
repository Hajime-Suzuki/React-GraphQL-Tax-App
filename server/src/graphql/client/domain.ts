import { ApolloError, AuthenticationError } from 'apollo-server-koa'
import { isEmptyObject } from '../../helpers/object'
import { removeEmptyProperty } from '../../helpers/transform'
import { Client } from './model'
import { IClientInput } from '../@types/types'
import { ClientRepository, IUpdateClientArgs } from './repository'

export const getClientsByUserId = async (userId: string) =>
  ClientRepository.getByUserId(userId)

export const getSingleClient = async (clientId: string) =>
  ClientRepository.getById(clientId)

export const getClientByProject = async (projectId: string) =>
  ClientRepository.getByProjectId(projectId)

export const addClient = (userId: string, clientInput: IClientInput) =>
  ClientRepository.findClientOrCreate(userId, clientInput)

export const updateClient = async ({
  userId,
  clientId,
  data
}: { userId: string } & IUpdateClientArgs) => {
  const client = await ClientRepository.getById(clientId)
  if (!client) throw new Error('client not found')

  if (client.user && client.user.toString() !== userId) {
    throw new AuthenticationError('you are not allowed to edit this client')
  }

  const updated = await ClientRepository.update(clientId, data)

  if (!updated) throw new Error('update error')
  return updated
}

export const updateClientProject = async (
  clientId: string | null | undefined,
  projectId: string
) => {
  const currentClient = await ClientRepository.getByProjectId(projectId)

  if (!currentClient && clientId) {
    return await ClientRepository.pushProjectId(clientId, projectId)
  }

  if (currentClient && clientId) {
    const updatedClient = await ClientRepository.pushProjectId(
      clientId,
      projectId
    )

    if (updatedClient && currentClient.id !== updatedClient.id) {
      await ClientRepository.popProjectId(currentClient.id, projectId)
    }
    return updatedClient
  }

  if (currentClient && !clientId) {
    await ClientRepository.popProjectId(currentClient.id, projectId)
    return null
  }

  return currentClient
}

export const deleteClient = async (clientId: string) => {
  const client = await Client.findById(clientId)
  if (!client) throw new ApolloError('client not found')
  await ClientRepository.remove(clientId)
  return client
}
