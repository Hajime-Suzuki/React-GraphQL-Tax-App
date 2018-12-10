import { Project } from '../../Models/Project'

export const getProjectsByUserId = async (userId: string) => {
  const projects = await Project.find({ user: userId })
  return projects
}
