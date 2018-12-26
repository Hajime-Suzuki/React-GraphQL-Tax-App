import { ApolloError, AuthenticationError } from 'apollo-server-koa'
import { removeEmptyProperty } from '../../helpers/transform'
import { Client } from '../../Models/Client'
import { Project } from '../../Models/Project'
import { User } from '../../Models/User'
import { IProjectInput, GetSingleProjectQueryArgs } from '../@types/types'
import { isEmptyObject } from '../../helpers/object'
import { updateOrCreateClient } from '../client/methods'

export const getProjectsByUserId = async (userId: string) => {
  const projects = await Project.find({ user: userId }).sort({ date: -1 })
  return projects
}

export const getSingleProject = async (
  projectId: GetSingleProjectQueryArgs['projectId']
) => {
  const project = await Project.findById(projectId).populate('client')
  return project
}

export const updateProject = async (
  projectId: string,
  { client: clientInput, ...data }: IProjectInput
) => {
  const project = await Project.findById(projectId).populate('client')

  if (!project) throw new ApolloError('project not found')

  if (clientInput) {
    await Client.findOneAndUpdate({ project: projectId }, clientInput)
  }
  const updatedProject = await Project.findByIdAndUpdate(projectId, data, {
    new: true
  }).populate('client')
  return updatedProject
}

export const addProject = async (
  userId: string,
  { client: clientInput, ...data }: IProjectInput
) => {
  if (!userId) throw new AuthenticationError('you are not logged in')
  const user = await User.findById(userId)
  if (!user) throw new Error('user is not found')

  const newProject = new Project({ ...data, user: user.id })

  const clientData = removeEmptyProperty<typeof clientInput>(clientInput)

  if (!isEmptyObject(clientData)) {
    const client = await updateOrCreateClient(clientData!, {
      ...clientData!,
      project: newProject.id,
      user: userId
    })
    newProject.client = client.id
  }

  const savedProject = await newProject.save()

  await User.findOneAndUpdate(
    { _id: user.id },
    { $addToSet: { projects: savedProject } }
  )

  return {
    success: true,
    message: 'project has been added',
    project: savedProject
  }
}
