import { removeEmptyProperty } from '../../helpers/transform'
import { Client } from '../../Models/Client'
import { IClientInput } from '../@types/types'

export const getClientsByUserId = async (userId: string) => {
  return Client.find({ user: userId })
}

export const getSingleClient = async (clientId: string) => {
  return Client.findById(clientId)
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
    const updateClient = await Client.findByIdAndUpdate(
      client.id,
      {
        ...rest,
        $addToSet: { projects: data.projectId }
      },
      {
        new: true
      }
    )
    return updateClient!
  }
}
