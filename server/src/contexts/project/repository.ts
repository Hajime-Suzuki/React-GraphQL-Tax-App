import {
  GetSingleProjectQueryArgs,
  IProjectInput,
  IUser
} from '../@types/types'
import { Project } from './model'

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

const create = async (
  { id: userId }: IUser,
  { client: clientInput, ...data }: IProjectInput
) => {
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
