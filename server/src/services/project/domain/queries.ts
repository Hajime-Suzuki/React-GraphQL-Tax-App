import { ProjectRepository } from '../repository'

const getProjectsByUserId = async (userId: string) => {
  return ProjectRepository.findByUserId(userId)
}

const getSingleProject = async (projectId: string) => {
  return ProjectRepository.findById(projectId)
}

export const ProjectQueries = {
  getProjectsByUserId,
  getSingleProject
}
