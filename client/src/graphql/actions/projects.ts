import { DataProxy } from 'apollo-cache'
import { differenceInDays, parseISO } from 'date-fns'
import { client } from '../client'
import { GetTokenDocument, GetTokenQuery } from '../components/client/login'
import {
  AddProjectMutation,
  GetProjectOverviewDocument,
  Project
} from '../components/projects'

// TODO: fix types
type OverviewType = any
// type OverviewType = GetProjectOverviewQuery

const getProjectOverview = () => {
  const { userId } = client.cache.readQuery<GetTokenQuery>({
    query: GetTokenDocument
  })!

  if (!userId) return {}

  const queryOption = {
    query: GetProjectOverviewDocument,
    variables: { userId }
  }
  try {
    return {
      projects: client.readQuery<OverviewType>(queryOption)!.projects,
      queryOption
    }
  } catch (error) {
    return {}
  }
}

const writeData = (
  queryOption: DataProxy.Query<{ userId: string }>,
  data: Project[]
) => {
  client.writeQuery<OverviewType>({
    ...queryOption,
    data: {
      projects: data
    }
  })
}

////////////////// export /////////////////////

const sortProjectsByProjectDate = (sort: '1' | '-1') => {
  const { projects, queryOption } = getProjectOverview()
  if (!projects || !queryOption) return

  const newData = [...projects].sort((p1, p2) => {
    const diff = differenceInDays(
      parseISO(p1.projectDate) || 0,
      parseISO(p2.projectDate) || 0
    )
    return sort === '1' ? diff : -diff
  })

  writeData(queryOption, newData)
}

const sortProjectsByInvoiceDate = (sort: '1' | '-1') => {
  const { projects, queryOption } = getProjectOverview()
  if (!projects || !queryOption) return

  const newData = [...projects].sort((p1, p2) => {
    const diff = differenceInDays(
      parseISO(p1.invoiceDate) || 0,
      parseISO(p2.invoiceDate) || 0
    )
    return sort === '1' ? diff : -diff
  })

  writeData(queryOption, newData)
}

const addNewProjectToList = ({ addProject }: AddProjectMutation) => {
  const { projects, queryOption } = getProjectOverview()
  if (!projects || !queryOption) return

  const newProject = addProject!.project!
  writeData(queryOption, [newProject, ...projects!])
}

const removeProject = (projectId: string) => {
  const { projects, queryOption } = getProjectOverview()
  if (!projects || !queryOption) return
  writeData(queryOption, projects.filter(p => p.id !== projectId))
}

export const ProjectActions = {
  sortProjectsByProjectDate,
  sortProjectsByInvoiceDate,
  addNewProjectToList,
  removeProject
}
