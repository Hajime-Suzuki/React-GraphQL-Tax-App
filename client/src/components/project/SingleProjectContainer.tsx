import * as React from 'react'
import {
  GetSingleProject,
  UpdateProject,
  ProjectInput
} from 'src/graphql/components/projects'
import { IRouterComponentProps } from 'src/routes/types'
import { LoadingIcon } from '../UI/LoadingIcon'
import SingleProject from './SingleProject'

export interface SingleProjectChildProps {
  project: GetSingleProject.GetSingleProject
  selectedModal: string | undefined
  handleOpenModal: (type: string) => () => void
  handleCloseModal: () => void
  handleSubmit: (values: ProjectInput) => void
}

// const removeTypeName = (item: { __typename: string; [key: string]: any }[]) =>
//   item.map(({ __typename, ...rest }) => ({
//     ...rest
//   }))

const removeTypename = (item: { [key: string]: any }) => {
  return JSON.parse(JSON.stringify(item), (key, value) =>
    key === '__typename' ? undefined : value
  )
}

type Props = GetSingleProject.Props<IRouterComponentProps> &
  UpdateProject.Props<{}>

class SingleProjectContainer extends React.Component<
  Props,
  { selectedModal: string | undefined }
> {
  state = {
    selectedModal: undefined
  }

  handleOpenModal = (type: string) => () =>
    this.setState({ selectedModal: type })

  handleCloseModal = () => this.setState({ selectedModal: undefined })

  handleSubmit = async (values: any) => {
    const { mutate: updateProject } = this.props
    // TODO: update client
    const res = await updateProject!({
      variables: {
        data: removeTypename(values),
        projectId: this.props.match.params.id
      }
    })

    console.log('update')
    this.setState({ selectedModal: undefined })
  }

  render() {
    const { data } = this.props
    if (!data) return null
    const { getSingleProject: project, error, loading } = data

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
  }
}

export default UpdateProject.HOC<IRouterComponentProps>({})(
  GetSingleProject.HOC<IRouterComponentProps>({
    options: props => {
      return { variables: { id: props.match.params.id } }
    }
  })(SingleProjectContainer)
)
