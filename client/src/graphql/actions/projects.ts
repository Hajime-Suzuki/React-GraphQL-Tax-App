import { DataProxy } from 'apollo-cache'
import { differenceInDays } from 'date-fns'
import { client } from '../client'
import { GetToken } from '../components/client/login'
import { GetProjectOverview } from '../components/projects'

type QueryOption = DataProxy.Query<{ userId: string }>

const getProjectData = () => {
  const { userId } = client.cache.readQuery<GetToken.Query>({
    query: GetToken.Document
  })!

  if (!userId) return {}

  const queryOption = {
    query: GetProjectOverview.Document,
    variables: { userId }
  }

  return {
    projects: client.readQuery<GetProjectOverview.Query>(queryOption),
    queryOption
  }
}

const writeData = (
  queryOption: QueryOption,
  data: GetProjectOverview.GetProjectsByUserId[]
) => {
  client.writeQuery({
    ...queryOption,
    data: {
      __typeName: 'Query',
      getProjectsByUserId: data
    }
  })
}

const sortProjectsByProjectDate = (sort: '1' | '-1') => {
  const { projects, queryOption } = getProjectData()
  if (!projects || !queryOption) return

  const newData = [...projects.getProjectsByUserId].sort((p1, p2) => {
    const diff = differenceInDays(p1.date || 0, p2.date || 0)
    return sort === '1' ? diff : -diff
  })

  writeData(queryOption, newData)
}

export const ProjectActions = {
  sortProjectsByProjectDate
}
