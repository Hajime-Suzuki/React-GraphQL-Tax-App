import { Project } from '../../Models/Project'
import { ApolloError } from 'apollo-server-koa'
import { IUpdateProjectInput } from '../@types/types'

export const getProjectsByUserId = async (userId: string) => {
  const projects = await Project.find({ user: userId })
  return projects
}

export const updateProject = async (
  projectId: string,
  data: IUpdateProjectInput
) => {
  console.log(data)

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    { ...data },
    { new: true }
  )

  if (!updatedProject) throw new ApolloError('project not found')

  return updatedProject
}
