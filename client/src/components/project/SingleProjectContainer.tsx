import * as React from 'react'
import { GetSingleProject } from 'src/graphql/components/projects'
import { IRouterComponentProps } from 'src/routes/types'
import { LoadingIcon } from '../UI/LoadingIcon'
import SingleProject from './SingleProject'

export interface SingleProjectChildProps {
  project: GetSingleProject.GetSingleProject
  selectedModal: string | undefined
  handleOpenModal: (type: string) => () => void
  handleCloseModal: (type: string) => () => void
  handleSubmit: () => void
}

class SingleProjectContainer extends React.Component<
  GetSingleProject.Props<IRouterComponentProps>,
  { selectedModal: string | undefined }
> {
  state = {
    selectedModal: undefined
  }

  handleOpenModal = (type: string) => () =>
    this.setState({ selectedModal: type })

  handleCloseModal = (type: string) => () =>
    this.setState({ selectedModal: undefined })

  handleSubmit = () => {
    console.log('submit!!!')
    this.setState({ selectedModal: undefined })
  }

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
              selectedModal={this.state.selectedModal}
              handleOpenModal={this.handleOpenModal}
              handleCloseModal={this.handleCloseModal}
              handleSubmit={this.handleSubmit}
            />
          )
        }}
      </GetSingleProject.Component>
    )
  }
}

export default SingleProjectContainer
