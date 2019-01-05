import { removeEmptyProperty } from '../../helpers/transform'
import { Client } from '../../Models/Client'
import { IClientInput, UpdateClientMutationArgs } from '../@types/types'
import { AuthenticationError } from 'apollo-server-koa'

export const getClientsByUserId = async (userId: string) => {
  return Client.find({ user: userId })
}

export const getSingleClient = async (clientId: string) => {
  return Client.findById(clientId)
}

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

export const updateOrCreateClient = async (
  {
    projectId: conditionPId,
    userId: conditionUId,
    ...condition
  }: IClientInput & { userId?: string; projectId?: string },
  data: IClientInput & { userId?: string; projectId?: string }
) => {
  const client = await Client.findOne({
    ...removeEmptyProperty(condition),
    ...(conditionPId && { projects: conditionPId }),
    ...(conditionUId && { user: conditionUId })
  })

  if (!client) {
    const newClient = await Client.create({
      ...data,
      projects: data.projectId,
      user: data.userId
    })
    return newClient
  } else {
    const { projectId: _, ...rest } = data
    const updatedClient = await Client.findByIdAndUpdate(
      client.id,
      {
        ...rest,
        $addToSet: { projects: data.projectId }
      },
      {
        new: true
      }
    )
    return updatedClient!
  }
}
