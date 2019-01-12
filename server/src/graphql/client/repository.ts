import { Client } from './model'
import { IClientInput } from '../@types/types'
import { removeEmptyProperty } from '../../helpers/transform'
import { isEmptyObject } from '../../helpers/object'
import { ApolloError } from 'apollo-server-koa'

const getByUserId = async (userId: string) => Client.find({ user: userId })

const getByProjectId = async (projectId: string) =>
  Client.findOne({ projects: projectId })

const getById = async (clientId: string) => Client.findById(clientId)

export interface IUpdateClientArgs {
  clientId: string
  data: IClientInput
}

const update = async (
  clientId: IUpdateClientArgs['clientId'],
  data: IUpdateClientArgs['data'],
  options: any = { new: true }
) => Client.findByIdAndUpdate(clientId, data, options)

const pushProjectId = async (
  clientId: IUpdateClientArgs['clientId'],
  projectId: string,
  options: any = { new: true }
) => {
  return Client.findByIdAndUpdate(
    clientId,
    {
      $addToSet: { projects: projectId }
    },
    options
  )
}

const popProjectId = async (
  clientId: IUpdateClientArgs['clientId'],
  projectId: string,
  options: any = { new: true }
) => {
  return Client.findByIdAndUpdate(
    clientId,
    { $pull: { projects: projectId } },
    options
  )
}

const findClientOrCreate = async (
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

const remove = async (clientId: string) => Client.remove({ _id: clientId })

export const ClientRepository = {
  getByUserId,
  getByProjectId,
  getById,
  update,
  pushProjectId,
  popProjectId,
  findClientOrCreate,
  remove
}
