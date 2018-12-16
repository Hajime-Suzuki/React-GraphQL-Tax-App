import { Project } from '../../Models/Project'
import { ApolloError, AuthenticationError } from 'apollo-server-koa'
import {
  IUpdateProjectInput,
  AddProjectMutationArgs,
  IAddProjectInput
} from '../@types/types'
import { User } from '../../Models/User'

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

export const addProject = async (userId: string, data: IAddProjectInput) => {
  if (!userId) throw new AuthenticationError('you are not logged in')
  const user = await User.findById(userId)
  if (!user) throw new Error('user is not found')

  const newProject = new Project({ ...data, user })
  const savedProject = await newProject.save()
  await User.findOneAndUpdate(
    { _id: user.id },
    { $push: { projects: savedProject } }
  )
  return {
    success: true,
    message: 'project has been added',
    project: savedProject
  }
}
