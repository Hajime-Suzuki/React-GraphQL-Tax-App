import { ApolloError, AuthenticationError } from 'apollo-server-koa'
import { isEmptyObject } from '../../helpers/object'
import { removeEmptyProperty } from '../../helpers/transform'
import { Client } from '../../Models/Client'
import { IClientInput } from '../@types/types'

export const getClientsByUserId = async (userId: string) =>
  Client.find({ user: userId })

export const getSingleClient = async (clientId: string) =>
  Client.findById(clientId)

export const getClientByProject = async (projectId: string) =>
  Client.findOne({ projects: projectId })

interface IUpdateClientArgs {
  clientId: string
  userId: string
  data: IClientInput
}
export const updateClient = async ({
  userId,
  clientId,
  data
}: IUpdateClientArgs) => {
  const client = await Client.findById(clientId)
  if (!client) throw new Error('client not found')

  if (client.user && client.user.toString() !== userId) {
    throw new AuthenticationError('you are not allowed to edit this client')
  }

  const updated = await Client.findByIdAndUpdate(clientId, data, { new: true })
  if (!updated) throw new Error('update error')
  return updated
}

export const updateClientProject = async (
  clientId: string | null | undefined,
  projectId: string
) => {
  const currentClient = await getClientByProject(projectId)

  if (!currentClient && clientId) {
    return await pushProjectId(clientId, projectId)
  }

  if (currentClient && clientId) {
    const updatedClient = await pushProjectId(clientId, projectId)

    if (updatedClient && currentClient.id !== updatedClient.id) {
      await popProjectId(currentClient.id, projectId)
    }
    return updatedClient
  }

  if (currentClient && !clientId) {
    await popProjectId(currentClient.id, projectId)
    return null
  }
  return currentClient
}

export const findClientOrCreate = async (
  userId: string,
  clientInput: IClientInput
) => {
  const clientData = removeEmptyProperty<typeof clientInput>(clientInput)

  if (isEmptyObject(clientData)) return null
  if (clientData!.id) {
    const clientId = clientData!.id!
    const client = await Client.findById(clientId)
    if (!client) throw new ApolloError('client not found')
    return client
  } else {
    return await Client.create({ ...clientData, user: userId })
  }
}

export const pushProjectId = async (clientId: string, projectId: string) => {
  return Client.findByIdAndUpdate(
    clientId,
    { $addToSet: { projects: projectId } },
    { new: true }
  )
}

export const popProjectId = async (clientId: string, projectId: string) => {
  return Client.findByIdAndUpdate(
    clientId,
    { $pull: { projects: projectId } },
    { new: true }
  )
}

export const deleteClient = async (clientId: string) => {
  const client = await Client.findById(clientId)
  if (!client) throw new ApolloError('client not found')
  await Client.remove({ _id: clientId })
  return client
}
