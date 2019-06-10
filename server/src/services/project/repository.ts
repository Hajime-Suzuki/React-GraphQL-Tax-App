import { Omit } from '../../helpers/types'
import {
  IQueryGetSingleProjectArgs,
  IProjectInput,
  IGetProjectsFilter,
  ISortOption
} from '../@types/types'
import { Project } from './model'

const findByUserId = (userId: string) =>
  Project.find({ user: userId }).sort({ createdAt: -1 })

const findById = (projectId: IQueryGetSingleProjectArgs['projectId']) =>
  Project.findById(projectId).populate('client')

const find = async (
  filter: IGetProjectsFilter = {},
  sortOption?: ISortOption
) => {
  const condition = {
    ...(filter.year && {
      invoiceDate: {
        $gte: new Date(filter.year, 1, 1),
        $lte: new Date(filter.year, 12, 31)
      }
    })
  }

  const data = await Project.find(condition).sort({
    createAt: -1,
    ...sortOption
  })
  return data
}

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
  find,
  update,
  create
}
