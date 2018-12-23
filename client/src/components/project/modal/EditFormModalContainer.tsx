// import React from 'react'
// import { withRouter } from 'react-router'
// import { GetSingleProject } from 'src/graphql/components/projects'
// import { IRouterComponentProps } from 'src/routes/types'
// import EditFormModal from './EditFormModal'

// interface OwnProps {
//   isOpen: boolean
//   handleCloseModal: () => void
// }

// type Props = OwnProps & GetSingleProject.Props<IRouterComponentProps>

// class EditFormModalContainer extends React.Component<Props> {
//   render() {
//     // const { isOpen, handleCloseModal } = this.props
//     return <EditFormModal {...this.props} />
//   }
// }

// export default withRouter(
//   GetSingleProject.HOC<Props>({
//     options: props => ({ variables: { id: props.match.params.id } })
//   })(EditFormModalContainer)
// )
