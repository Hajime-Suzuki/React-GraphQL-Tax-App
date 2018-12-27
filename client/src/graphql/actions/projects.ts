import { DataProxy } from 'apollo-cache'
import { differenceInDays } from 'date-fns'
import { client } from '../client'
import { GetToken } from '../components/client/login'
import { AddProject, GetProjectOverview } from '../components/projects'

type OverviewType = GetProjectOverview.Query

const getProjectOverview = () => {
  const { userId } = client.cache.readQuery<GetToken.Query>({
    query: GetToken.Document
  })!

  if (!userId) return {}

  const queryOption = {
    query: GetProjectOverview.Document,
    variables: { userId }
  }
  try {
    return {
      projects: client.readQuery<OverviewType>(queryOption)!
        .getProjectsByUserId,
      queryOption
    }
  } catch (error) {
    return {}
  }
}

const writeData = (
  queryOption: DataProxy.Query<{ userId: string }>,
  data: GetProjectOverview.GetProjectsByUserId[]
) => {
  client.writeQuery<OverviewType>({
    ...queryOption,
    data: {
      getProjectsByUserId: data
    }
  })
}

////////////////// export /////////////////////

const sortProjectsByProjectDate = (sort: '1' | '-1') => {
  const { projects, queryOption } = getProjectOverview()
  if (!projects || !queryOption) return

  const newData = [...projects].sort((p1, p2) => {
    const diff = differenceInDays(p1.projectDate || 0, p2.projectDate || 0)
    return sort === '1' ? diff : -diff
  })

  writeData(queryOption, newData)
}

const sortProjectsByInvoiceDate = (sort: '1' | '-1') => {
  const { projects, queryOption } = getProjectOverview()
  if (!projects || !queryOption) return

  const newData = [...projects].sort((p1, p2) => {
    const diff = differenceInDays(p1.invoiceDate || 0, p2.invoiceDate || 0)
    return sort === '1' ? diff : -diff
  })

  writeData(queryOption, newData)
}

const addNewProjectToList = ({ addProject }: AddProject.Mutation) => {
  const { projects, queryOption } = getProjectOverview()
  if (!projects || !queryOption) return

  const newProject = addProject!.project!
  writeData(queryOption, [...projects!, newProject])
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
