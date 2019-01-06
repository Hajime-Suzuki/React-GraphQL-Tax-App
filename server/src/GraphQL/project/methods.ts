import { ApolloError } from 'apollo-server-koa'
import { isEmptyObject } from '../../helpers/object'
import { removeEmptyProperty } from '../../helpers/transform'
import { Client } from '../../Models/Client'
import { Project } from '../../Models/Project'
import { User } from '../../Models/User'
import { getInvoicePDF } from '../../pdf/generatePDF'
import {
  GetSingleProjectQueryArgs,
  IClientInput,
  IProjectInput,
  IUser
} from '../@types/types'
import { addClient } from '../client/methods'

export const getProjectsByUserId = async (userId: string) =>
  Project.find({ user: userId }).sort({ createdAt: -1 })

export const getSingleProject = async (
  projectId: GetSingleProjectQueryArgs['projectId']
) => Project.findById(projectId).populate('client')

export const updateProject = async (projectId: string, data: IProjectInput) => {
  const project = await Project.findById(projectId).populate('client')

  if (!project) throw new ApolloError('project not found')

  const updatedProject = await Project.findByIdAndUpdate(projectId, data, {
    new: true
  }).populate('client')
  return updatedProject
}

export const addProject = async (
  { id: userId }: IUser,
  { client: clientInput, ...data }: IProjectInput
) => {
  const newProject = new Project({ ...data, user: userId })

  const clientData = removeEmptyProperty<typeof clientInput>(clientInput)
  if (!isEmptyObject(clientData)) {
    if (clientData!.id) {
      const clientId = clientData!.id!
      const client = await Client.findById(clientId)
      if (!client) throw new Error(`Client with ID ${clientId} not found`)
      newProject.client = client
    } else {
      const newClient = await addClient(userId, clientData as NonNullable<
        IClientInput
      >)
      newProject.client = newClient
    }
  }

  const savedProject = await newProject.save()

  await User.findByIdAndUpdate(userId, {
    $addToSet: { projects: newProject.id }
  })

  return savedProject
}

export const deleteProject = async (projectId: string) =>
  Project.findByIdAndDelete(projectId)

export const generateInvoice = async (projectId: string, token: string) =>
  getInvoicePDF(projectId, token)
