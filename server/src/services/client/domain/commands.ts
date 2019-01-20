import { ApolloError, AuthenticationError } from 'apollo-server-koa'
import { ClientRepository, IUpdateClientArgs } from '../repository'
import { IClientInput } from '../../@types/types'
import { Client } from '../model'

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
  const existingClientInProject = await ClientRepository.findByProjectId(
    projectId
  )

  if (!existingClientInProject) {
    const updatedClient = await ClientRepository.pushProjectId(
      clientId,
      projectId
    )
    return updatedClient
  }

  if (!!existingClientInProject) {
    const updatedClient = await ClientRepository.pushProjectId(
      clientId,
      projectId
    )

    if (updatedClient && existingClientInProject.id !== updatedClient.id) {
      await ClientRepository.popProjectId(
        existingClientInProject.id,
        projectId
      )
    }
    return updatedClient
  }

  return null
}

const removeClientFromProject = async (clientId: string, projectId: string) => {
  // TODO: test
  const updatedClient = await ClientRepository.popProjectId(
    clientId,
    projectId
  )
  return updatedClient
}

const deleteClient = async (clientId: string) => {
  if (!clientId) throw new ApolloError('client id must be provided')
  const client = await Client.findById(clientId)
  if (!client) throw new ApolloError('client not found')
  await ClientRepository.remove(clientId)
  return client
}

export const ClientCommands = {
  addClient,
  updateClient,
  updateClientProject,
  removeClientFromProject,
  deleteClient
}
