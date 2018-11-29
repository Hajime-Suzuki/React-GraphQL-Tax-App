import { Project, IProject } from '../../Models/Project'

export const getProjectsByUser = async (
  userId: string
): Promise<IProject[]> => {
  // TODO: change interface to graphql generated one
  const projects = await Project.find({ user: userId })
  return projects
}
