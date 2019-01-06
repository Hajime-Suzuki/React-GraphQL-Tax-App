import { AuthenticationError } from 'apollo-server-koa'
import { Client } from '../../Models/Client'
import { IClientInput, UpdateClientMutationArgs } from '../@types/types'

export const getClientsByUserId = async (userId: string) =>
  Client.find({ user: userId })

export const getSingleClient = async (clientId: string) =>
  Client.findById(clientId)

export const updateClient = async ({
  userId,
  clientId,
  data
}: UpdateClientMutationArgs & { userId: string }) => {
  const client = await Client.findById(clientId)
  if (!client) throw new Error('client not found')

  if (client.user && client.user.toString() !== userId) {
    throw new AuthenticationError('you are not allowed to edit this client')
  }

  const updated = await Client.findByIdAndUpdate(clientId, data, { new: true })
  if (!updated) throw new Error('update error')
  return updated
}

export const addClient = async (userId: string, data: IClientInput) => {
  const client = await Client.create({ ...data, user: userId })
  return client
}

export const deleteClient = async (clientId: string) =>
  Client.remove({ _id: clientId })
