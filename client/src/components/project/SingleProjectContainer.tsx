import * as React from 'react'
import { GetSingleProject } from 'src/graphql/components/projects'
import { RouteComponentProps } from 'react-router'
import { LoadingIcon } from '../UI/LoadingIcon'
import SingleProject from './SingleProject'

type OwnProps = RouteComponentProps<{ id: string }>

class SingleProjectContainer extends React.Component<
  GetSingleProject.Props<OwnProps>,
  { isModalOpen: boolean }
> {
  state = {
    isModalOpen: false
  }

  handleOpenModal = () => this.setState({ isModalOpen: true })

  handleCloseModal = () => this.setState({ isModalOpen: false })

  render() {
    return (
      <GetSingleProject.Component
        variables={{ id: this.props.match.params.id }}
      >
        {({ data, error, loading }) => {
          if (!data) return null

          const { getSingleProject: project } = data

          if (error) return <p>{error}</p>
          if (loading) return <LoadingIcon />
          if (!project) return <p>Project not found</p>

          return (
            <SingleProject
              project={project}
              isModalOpen={this.state.isModalOpen}
              handleOpenModal={this.handleOpenModal}
              handleCloseModal={this.handleCloseModal}
            />
          )
        }}
      </GetSingleProject.Component>
    )
  }
}

export default SingleProjectContainer
