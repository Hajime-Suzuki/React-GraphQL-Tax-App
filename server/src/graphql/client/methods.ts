import { Client } from '../../Models/Client'
import { User } from '../../Models/User'
import { removeEmptyProperty } from '../../helpers/transform'
import { IClient, IClientInput } from '../@types/types'

export const getClientsByUserId = async (userId: string) => {
  return Client.find({ user: userId })
}

export const updateOrCreateClient = async (
  condition: IClientInput & { user?: string; project?: string },
  data: IClientInput & { user?: string; project?: string }
) => {
  const client = await Client.findOne(removeEmptyProperty(condition))

  if (!client) {
    const newClient = await Client.create(data)
    return newClient
  } else {
    const { project, ...rest } = data // if project is passed, it makes conflict to '$push'
    const updateClient = await Client.findByIdAndUpdate(
      client.id,
      {
        ...rest,
        $addToSet: { projects: data.project }
      },
      {
        new: true
      }
    )
    return updateClient!
  }
}
