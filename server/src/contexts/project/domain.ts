import { ApolloError } from 'apollo-server-koa'

import { IProjectInput, IUser } from '../@types/types'
import { ClientRepository } from '../client/repository'
import { Project } from './model'
import { ProjectRepository } from './repository'
import { PDFDomain } from '../pdf/domain'

const updateProject = async (projectId: string, data: IProjectInput) => {
  const project = await ProjectRepository.getById(projectId)
  if (!project) throw new ApolloError('project not found')

  const updatedProject = await ProjectRepository.update(projectId, data)

  if (!updatedProject) throw new ApolloError('project couldn\'t be updated')
  return updatedProject
}

const addProject = async (
  { id: userId }: IUser,
  { client: clientInput, ...data }: IProjectInput
) => {
  const newProject = new Project({ ...data, user: userId })
  const savedProject = await newProject.save()

  const client =
    clientInput &&
    (await ClientRepository.findClientOrCreate(userId, clientInput))

  if (client) {
    await ClientRepository.pushProjectId(client.id, savedProject.id)
  }

  return { project: savedProject, client }
}

const deleteProject = async (projectId: string) => {
  const project = await Project.findById(projectId)
  if (!project) throw new ApolloError('project not found')
  await Project.findByIdAndDelete(projectId)
  return project
}

const generateInvoice = async (projectId: string, token: string) =>
  PDFDomain.getInvoicePDF(projectId, token)

export const ProjectDomain = {
  updateProject,
  addProject,
  deleteProject,
  generateInvoice
}
