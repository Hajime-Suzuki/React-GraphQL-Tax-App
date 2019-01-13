import { ApolloError, AuthenticationError } from 'apollo-server-koa'
import { IClientInput } from '../@types/types'
import { Client } from './model'
import { ClientRepository, IUpdateClientArgs } from './repository'

const addClient = (userId: string, clientInput: IClientInput) =>
  ClientRepository.findClientOrCreate(userId, clientInput)

const updateClient = async ({
  userId,
  clientId,
  data
}: { userId: string } & IUpdateClientArgs) => {
  const client = await ClientRepository.findById(clientId)
  if (!client) throw new Error('client not found')

  if (client.user && client.user.toString() !== userId) {
    throw new AuthenticationError('you are not allowed to edit this client')
  }

  const updated = await ClientRepository.update(clientId, data)

  if (!updated) throw new Error('update error')
  return updated
}

const updateClientProject = async (clientId: string, projectId: string) => {
  const currentClient = await ClientRepository.findByProjectId(projectId)

  if (!currentClient) {
    return await ClientRepository.pushProjectId(clientId, projectId)
  }

  if (currentClient) {
    const updatedClient = await ClientRepository.pushProjectId(
      clientId,
      projectId
    )

    if (updatedClient && currentClient.id !== updatedClient.id) {
      await ClientRepository.popProjectId(currentClient.id, projectId)
    }
    return updatedClient
  }

  return currentClient
}

const deleteClient = async (clientId: string) => {
  const client = await Client.findById(clientId)
  if (!client) throw new ApolloError('client not found')
  await ClientRepository.remove(clientId)
  return client
}

export const ClientDomain = {
  addClient,
  updateClient,
  updateClientProject,
  deleteClient
}
