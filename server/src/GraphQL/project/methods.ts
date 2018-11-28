import { Project } from '../../Models/Project'

export const getProjectByUserId = (userId: string) => {
  const projects = Project.find({ user: userId })
  console.log(projects)
}
