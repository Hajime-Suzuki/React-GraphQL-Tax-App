import * as React from 'react'
import { GetSingleProject } from 'src/graphql/components/projects'
import { RouteComponentProps } from 'react-router'
import { LoadingIcon } from '../UI/LoadingIcon'
import SingleProject from './SingleProject'

type OwnProps = RouteComponentProps<{ id: string }>

class SingleProjectContainer extends React.Component<
  GetSingleProject.Props<OwnProps>
> {
  render() {
    const data = this.props.data
    if (!data) return null

    const { getSingleProject: project, loading, error } = data
    if (error) return <p>{error}</p>
    if (loading) return <LoadingIcon />
    if (!project) return <p>Project not found</p>

    return <SingleProject project={project} />
  }
}

export default GetSingleProject.HOC<OwnProps>({
  options: props => {
    return {
      variables: { id: props.match.params.id }
    }
  }
})(SingleProjectContainer)
