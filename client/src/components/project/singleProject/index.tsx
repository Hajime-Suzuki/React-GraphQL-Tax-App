import * as React from 'react'
import {
  DownloadInvoice,
  GetSingleProject
} from 'src/graphql/components/projects'
import { IRouterComponentProps } from 'src/routes/types'
import { LoadingIcon } from '../../UI/LoadingIcon'
import SingleProject from './SingleProject'
import { MutationFn } from 'react-apollo'

export type ModalType = 'basic' | 'incomes' | 'expenses' | 'status'
export interface SingleProjectChildProps {
  project: GetSingleProject.GetSingleProject
  selectedModal: string | undefined
  handleOpenModal: (type: ModalType) => () => void
  handleCloseModal: () => void
  handleDownload: () => void
  pdfLoading: boolean
  pdfError?: string
}

type Props = GetSingleProject.Props<IRouterComponentProps>

class SingleProjectContainer extends React.Component<
  Props,
  {
    selectedModal: string | undefined
  }
> {
  state = { selectedModal: undefined }

  handleOpenModal = (type: string) => () =>
    this.setState({ selectedModal: type })

  handleCloseModal = () => this.setState({ selectedModal: undefined })

  downloadInvoice = (
    download: MutationFn<DownloadInvoice.Mutation, DownloadInvoice.Variables>
  ) => async () => {
    const res = await download({
      variables: { projectId: this.props.match.params.id }
    })
    if (!res || !res.data || !res.data.downloadInvoice) return

    const buffer = res.data.downloadInvoice.data.data
    const file = new Blob([new Uint8Array(buffer)], {
      type: 'application/pdf'
    })
    const fileUrl = URL.createObjectURL(file)

    const invoiceNumber = this.props.data!.getSingleProject!.invoiceNumber

    const a = document.createElement('a')
    a.href = fileUrl
    a.download = `invoice-${invoiceNumber}.pdf`
    a.click()
    URL.revokeObjectURL(fileUrl)
  }

  render() {
    const { data } = this.props
    if (!data) return null

    const { getSingleProject: project, error, loading } = data

    if (error) return <p>{error.message}</p>
    if (loading) return <LoadingIcon />
    if (!project) return <p>Project not found</p>

    return (
      <DownloadInvoice.Component>
        {(mutate, { error: mutationError, loading: mutationLoading }) => {
          return (
            <SingleProject
              project={project}
              selectedModal={this.state.selectedModal}
              handleOpenModal={this.handleOpenModal}
              handleCloseModal={this.handleCloseModal}
              handleDownload={this.downloadInvoice(mutate)}
              pdfLoading={mutationLoading}
              pdfError={mutationError && mutationError.message}
            />
          )
        }}
      </DownloadInvoice.Component>
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
