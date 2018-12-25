import * as React from 'react'
import {
  GetSingleProject,
  UpdateIncomesAndExpenses,
  ProjectInput
} from 'src/graphql/components/projects'
import { IRouterComponentProps } from 'src/routes/types'
import { LoadingIcon } from '../UI/LoadingIcon'
import SingleProject from './SingleProject'
import { ApolloError } from 'apollo-client'
import { ErrorActions } from 'src/graphql/actions/error'

export interface SingleProjectChildProps {
  project: GetSingleProject.GetSingleProject
  selectedModal: string | undefined
  handleOpenModal: (type: string) => () => void
  handleCloseModal: () => void
  // handleSubmit: (values: ProjectInput) => void
}

type Props = GetSingleProject.Props<IRouterComponentProps> &
  UpdateIncomesAndExpenses.Props<{}>

class SingleProjectContainer extends React.Component<
  Props,
  { selectedModal: string | undefined }
> {
  state = { selectedModal: undefined }

  handleOpenModal = (type: string) => () =>
    this.setState({ selectedModal: type })

  handleCloseModal = () => this.setState({ selectedModal: undefined })

  // handleSubmit = async (values: ProjectInput) => {
  //   const { mutate: updateProject } = this.props

  //   const res = await updateProject!({
  //     variables: {
  //       data: values,
  //       projectId: this.props.match.params.id
  //     }
  //   })
  //   if (res) this.setState({ selectedModal: undefined })
  // }

  render() {
    const { data } = this.props
    if (!data) return null
    console.log(this.props)
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
        // handleSubmit={this.handleSubmit}
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

// import * as React from 'react'
// import {
//   GetSingleProject,
//   UpdateIncomesAndExpenses,
//   ProjectInput
// } from 'src/graphql/components/projects'
// import { IRouterComponentProps } from 'src/routes/types'
// import { LoadingIcon } from '../UI/LoadingIcon'
// import SingleProject from './SingleProject'
// import { ApolloError } from 'apollo-client'

// export interface SingleProjectChildProps {
//   project: GetSingleProject.GetSingleProject
//   selectedModal: string | undefined
//   handleOpenModal: (type: string) => () => void
//   handleCloseModal: () => void
//   handleSubmit: (values: ProjectInput) => void
// }

// type Props = GetSingleProject.Props<IRouterComponentProps> &
//   UpdateIncomesAndExpenses.Props<{}>

// class SingleProjectContainer extends React.Component<
//   Props,
//   { selectedModal: string | undefined }
//   > {
//   state = { selectedModal: undefined }

//   handleOpenModal = (type: string) => () =>
//     this.setState({ selectedModal: type })

//   handleCloseModal = () => this.setState({ selectedModal: undefined })

//   handleSubmit = async (values: ProjectInput) => {
//     const { mutate: updateProject } = this.props
//     await updateProject!({
//       variables: {
//         data: values,
//         projectId: this.props.match.params.id
//       }
//     })
//     console.log('update')
//     this.setState({ selectedModal: undefined })
//   }

//   render() {
//     const { data } = this.props
//     if (!data) return null
//     console.log(data.error)
//     const { getSingleProject: project, error, loading } = data

//     if (error) return <p>{error}</p>
//     if (loading) return <LoadingIcon />
//     if (!project) return <p>Project not found</p>

//     return (
//       <UpdateIncomesAndExpenses.Component>
//         {(mutate, { error }) => {
//           return (
//             <SingleProject
//               project={project}
//               selectedModal={this.state.selectedModal}
//               handleOpenModal={this.handleOpenModal}
//               handleCloseModal={this.handleCloseModal}
//               handleSubmit={async values => {
//                 const res = await mutate!({
//                   variables: {
//                     data: values,
//                     projectId: this.props.match.params.id
//                   }
//                 })
//                 console.log(res)
//                 this.setState({ selectedModal: undefined })
//               }}
//             />
//           )
//         }}
//       </UpdateIncomesAndExpenses.Component>
//     )
//   }
// }

// export default GetSingleProject.HOC<IRouterComponentProps>({
//   options: props => {
//     return {
//       variables: { id: props.match.params.id }
//     }
//   }
// })(SingleProjectContainer)
