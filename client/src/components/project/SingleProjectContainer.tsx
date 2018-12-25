import * as React from 'react'
import { GetSingleProject } from 'src/graphql/components/projects'
import { IRouterComponentProps } from 'src/routes/types'
import { LoadingIcon } from '../UI/LoadingIcon'
import SingleProject from './SingleProject'

export interface SingleProjectChildProps {
  project: GetSingleProject.GetSingleProject
  selectedModal: string | undefined
  handleOpenModal: (type: string) => () => void
  handleCloseModal: () => void
}

type Props = GetSingleProject.Props<IRouterComponentProps>

class SingleProjectContainer extends React.Component<
  Props,
  { selectedModal: string | undefined }
> {
  state = { selectedModal: undefined }

  handleOpenModal = (type: string) => () =>
    this.setState({ selectedModal: type })

  handleCloseModal = () => this.setState({ selectedModal: undefined })

  render() {
    const { data } = this.props
    if (!data) return null

    const { getSingleProject: project, error, loading } = data

    if (error) return <p>{error.message}</p>
    if (loading) return <LoadingIcon />
    if (!project) return <p>Project not found</p>

    return (
      <SingleProject
        project={project}
        selectedModal={this.state.selectedModal}
        handleOpenModal={this.handleOpenModal}
        handleCloseModal={this.handleCloseModal}
      />
    )
  }
}

export default GetSingleProject.HOC<IRouterComponentProps>({
  options: props => {
    return {
      variables: { id: props.match.params.id }
    }
  }
})(SingleProjectContainer)
