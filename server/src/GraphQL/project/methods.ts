import { Project } from '../../Models/Project'

export const getProjectsByUserId = async (userId: string) => {
  console.log('get projects')
  const projects = await Project.find({ user: userId })
  return projects
}
