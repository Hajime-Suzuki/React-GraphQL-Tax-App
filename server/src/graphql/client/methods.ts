import { AuthenticationError, ApolloError } from 'apollo-server-koa'
import { Client } from '../../Models/Client'
import {
  IClientInput,
  UpdateClientMutationArgs,
  IClient
} from '../@types/types'
import { removeEmptyProperty } from '../../helpers/transform'
import { isEmptyObject } from '../../helpers/object'
import { User } from '../../Models/User'

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

export const findClientOrCreate = async (
  userId: string,
  clientInput: IClientInput
) => {
  const clientData = removeEmptyProperty<typeof clientInput>(clientInput)

  if (!isEmptyObject(clientData)) return null

  if (clientData!.id) {
    const clientId = clientData!.id!
    const client = await Client.findById(clientId)
    if (!client) throw new ApolloError('client not found')
    return client
  } else {
    return Client.create({ ...clientData, user: userId })
  }
}

export const pushProjectId = async (clientId: string, projectId: string) => {
  return Client.findByIdAndUpdate(
    clientId,
    { $push: { projects: projectId } },
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
