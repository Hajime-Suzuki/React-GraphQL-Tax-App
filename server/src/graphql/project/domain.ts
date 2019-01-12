import { ApolloError } from 'apollo-server-koa'
import { Project } from './model'
import { getInvoicePDF } from '../../pdf/generatePDF'
import {
  GetSingleProjectQueryArgs,
  IProjectInput,
  IUser
} from '../@types/types'
import { ProjectRepository } from './repository'

const getProjectsByUserId = async (userId: string) =>
  ProjectRepository.getByUserId(userId)

const getSingleProject = async (
  projectId: GetSingleProjectQueryArgs['projectId']
) => ProjectRepository.getById(projectId)

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
  return savedProject
}

const deleteProject = async (projectId: string) => {
  const project = await Project.findById(projectId)
  if (!project) throw new ApolloError('project not found')
  await Project.findByIdAndDelete(projectId)
  return project
}

const generateInvoice = async (projectId: string, token: string) =>
  getInvoicePDF(projectId, token)

export const ProjectDomain = {
  getProjectsByUserId,
  getSingleProject,
  updateProject,
  addProject,
  deleteProject,
  generateInvoice
}
