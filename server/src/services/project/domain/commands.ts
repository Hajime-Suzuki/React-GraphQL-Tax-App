import { ApolloError } from 'apollo-server-koa'
import { IProjectInput, IUser } from '../../@types/types'
import { PDFDomain } from '../../pdf/domain'
import { Project } from '../model'
import { ProjectRepository } from '../repository'
import { ProjectManager } from './manager'

const updateProject = async (projectId: string, data: IProjectInput) => {
  const project = await ProjectRepository.findById(projectId)
  if (!project) throw new ApolloError('project not found')

  const updatedProject = await ProjectRepository.update(projectId, data)

  if (!updatedProject) throw new ApolloError('project couldn\'t be updated')
  return updatedProject
}

const addProject = async (
  user: IUser,
  { client: clientInput, ...data }: IProjectInput
) => {
  if (clientInput) {
    const savedProject = await ProjectRepository.create(user.id, data)

    // TODO: chnage
    const client =
      clientInput && (await ProjectManager.getClientByUser(user.id))

    if (client) {
      await ProjectManager.updateClientProject(client.id, savedProject.id)
    }

    return savedProject
  }
  return null
}

const deleteProject = async (projectId: string) => {
  const project = await Project.findById(projectId)
  if (!project) throw new ApolloError('project not found')
  await Project.findByIdAndDelete(projectId)
  return project
}

const generateInvoice = async (projectId: string, token: string) =>
  PDFDomain.getInvoicePDF(projectId, token)

export const ProjectCommands = {
  updateProject,
  addProject,
  deleteProject,
  generateInvoice
}
