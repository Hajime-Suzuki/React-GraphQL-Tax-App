import {
  GetSingleProjectQueryArgs,
  IProjectInput,
  IUser,
  IClientInput
} from '../@types/types'
import { Project } from './model'
import { Omit } from '../../helpers/types'

const findByUserId = (userId: string) =>
  Project.find({ user: userId }).sort({ createdAt: -1 })

const findById = (projectId: GetSingleProjectQueryArgs['projectId']) =>
  Project.findById(projectId).populate('client')

const update = async (projectId: string, data: IProjectInput) => {
  const updatedProject = await Project.findByIdAndUpdate(projectId, data, {
    new: true
  })
  return updatedProject
}

const create = async (userId: string, data: Omit<IProjectInput, 'client'>) => {
  const newProject = new Project({ ...data, user: userId })
  const savedProject = await newProject.save()
  return savedProject
}

export const ProjectRepository = {
  findByUserId,
  findById,
  update,
  create
}
