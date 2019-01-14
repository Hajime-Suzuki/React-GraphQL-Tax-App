import { ApolloError } from 'apollo-server-koa'
import { IProjectInput, IUser, IClient } from '../../@types/types'
import { PDFDomain } from '../../pdf/domain'
import { Project } from '../model'
import { ProjectRepository } from '../repository'
import { ProjectManager } from './manager'

const addProject = async (
  user: IUser,
  { client: clientInput, ...data }: IProjectInput
) => {
  const savedProject = await ProjectRepository.create(user.id, data)

  if (clientInput) {
    // TODO: check
    let clientToReturn: IClient | null
    const client =
      clientInput &&
      (await ProjectManager.getClientByCondition(user.id, clientInput))

    if (client) {
      clientToReturn = await ProjectManager.updateClientProject(
        client.id,
        savedProject.id
      )
    } else {
      clientToReturn = await ProjectManager.addClient(user.id, clientInput)
    }

    return { savedProject, client: clientToReturn }
  }

  return { savedProject }
}

const updateProject = async (projectId: string, data: IProjectInput) => {
  const project = await ProjectRepository.findById(projectId)
  if (!project) throw new ApolloError('project not found')

  const updatedProject = await ProjectRepository.update(projectId, data)

  let updatedClient: IClient | null = null
  if (data.client && data.client.id) {
    updatedClient = await ProjectManager.updateClientProject(
      data.client.id,
      project.id
    )
  }

  if (!updatedProject) throw new ApolloError('project couldn\'t be updated')
  return { updatedProject, updatedClient }
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
