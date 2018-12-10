import * as React from 'react'
import { GetProjectOverview } from 'src/graphql/components/projects'
import { GetToken } from 'src/graphql/components/client/login'
import { LoadingIcon } from '../UI/LoadingIcon'
import ProjectsList from './ProjectsList'

interface Props {
  data: GetToken.Query
}

class ProjectsListContainer extends React.Component<Props> {
  // handleChange = (e, newValue, previousValue, projectId) => {
  //   this.props.updateStaus(projectId, newValue)
  // }
  render() {
    const userId = this.props.data.userId
    if (!userId) return null
    return (
      <GetProjectOverview.Component variables={{ userId }}>
        {({ data, loading, error }) => {
          console.log(data)

          if (loading) return <LoadingIcon />
          if (error) return <p>{error.message}</p>
          if (!data) return null
          return <ProjectsList projects={data.getProjectsByUserId} />
        }}
      </GetProjectOverview.Component>
    )
  }
}

export default GetToken.HOC({})(ProjectsListContainer)
