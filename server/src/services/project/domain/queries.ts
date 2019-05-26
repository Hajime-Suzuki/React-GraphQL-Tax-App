import { IGetProjectsFilter, ISortOption } from '../../@types/types'
import { ProjectRepository } from '../repository'

const getProjectsByUserId = async (userId: string) => {
  return ProjectRepository.findByUserId(userId)
}

const getProjects = async (
  filter?: IGetProjectsFilter,
  sortOption?: ISortOption
) => {
  return ProjectRepository.find(filter, sortOption)
}

const getSingleProject = async (projectId: string) => {
  return ProjectRepository.findById(projectId)
}

export const ProjectQueries = {
  getProjectsByUserId,
  getSingleProject,
  getProjects
}
