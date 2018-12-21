import { ApolloError, AuthenticationError } from 'apollo-server-koa'
import { removeEmptyProperty } from '../../helpers/transform'
import { Client } from '../../Models/Client'
import { Project } from '../../Models/Project'
import { User } from '../../Models/User'
import {
  IAddProjectInput,
  IUpdateProjectInput,
  GetSingleProjectQueryArgs
} from '../@types/types'
import { isEmptyObject } from '../../helpers/object'

export const getProjectsByUserId = async (userId: string) => {
  const projects = await Project.find({ user: userId })
    .sort({ date: -1 })
    .limit(10)
  return projects
}

export const getSingleProject = async (
  projectId: GetSingleProjectQueryArgs['projectId']
) => {
  const project = await Project.findById(projectId)
  return project
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

  const newProject = new Project({ ...data, user: user.id })
  const clientData = removeEmptyProperty<typeof data.client>(data.client)

  if (!isEmptyObject(clientData)) {
    const clientDataWithUser = { ...clientData, user: userId }
    const client = await Client.findOne(clientDataWithUser).then(
      existingClient => {
        console.log(existingClient)
        if (!existingClient) return Client.create(clientDataWithUser)
        return existingClient
      }
    )
    newProject.client = client
  }

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
