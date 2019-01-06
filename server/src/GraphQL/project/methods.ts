import { ApolloError } from 'apollo-server-koa'
import { isEmptyObject } from '../../helpers/object'
import { removeEmptyProperty } from '../../helpers/transform'
import { Project } from '../../Models/Project'
import { User } from '../../Models/User'
import { getInvoicePDF } from '../../pdf/generatePDF'
import {
  GetSingleProjectQueryArgs,
  IProjectInput,
  IUser
} from '../@types/types'
import { updateOrCreateClient } from '../client/methods'

export const getProjectsByUserId = async (userId: string) =>
  Project.find({ user: userId }).sort({ createdAt: -1 })

export const getSingleProject = async (
  projectId: GetSingleProjectQueryArgs['projectId']
) => Project.findById(projectId).populate('client')

export const updateProject = async (
  projectId: string,
  { client: clientInput, ...data }: IProjectInput
) => {
  const project = await Project.findById(projectId).populate('client')

  if (!project) throw new ApolloError('project not found')

  if (clientInput) {
    const client = await updateOrCreateClient(
      { projectId },
      { ...clientInput, projectId }
    )
    ; (data as any).client = client.id
  }

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
    const client = await updateOrCreateClient({ ...clientData, userId }!, {
      ...clientData!,
      projectId: newProject.id,
      userId
    })
    newProject.client = client.id
  }

  const savedProject = await newProject.save()

  await User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { projects: savedProject } }
  )

  return savedProject
}

export const deleteProject = async (projectId: string) =>
  Project.findByIdAndDelete(projectId)

export const generateInvoice = async (projectId: string, token: string) =>
  getInvoicePDF(projectId, token)
