import * as React from 'react'
import {
  // DownloadInvoice,
  // GetSingleProject,
  DownloadInvoiceMutation,
  DownloadInvoiceMutationVariables,
  DownloadInvoiceComponent,
  GetSingleProjectProps,
  Project,
  Client,
  withGetSingleProject
} from 'src/graphql/components/projects'
import { IRouterComponentProps } from 'src/routes/types'
import { LoadingIcon } from '../../UI/LoadingIcon'
import SingleProject from './SingleProject'
import { MutationFn } from 'react-apollo'

export type ModalType = 'basic' | 'incomes' | 'expenses' | 'client'

export interface SingleProjectChildProps {
  project: Project
  client?: Client | null
  selectedModal?: ModalType
  handleOpenModal: (type: ModalType) => () => void
  handleCloseModal: () => void
  handleDownload: () => void
  pdfLoading: boolean
  pdfError?: string
}

type Props = GetSingleProjectProps<IRouterComponentProps>

class SingleProjectContainer extends React.Component<
  Props,
  {
    selectedModal: SingleProjectChildProps['selectedModal']
  }
> {
  state = { selectedModal: undefined }

  handleOpenModal = (type: ModalType) => () =>
    this.setState({ selectedModal: type })

  handleCloseModal = () => this.setState({ selectedModal: undefined })

  downloadInvoice = (
    download: MutationFn<
      DownloadInvoiceMutation,
      DownloadInvoiceMutationVariables
    >
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

    const invoiceNumber = this.props.data!.project!.invoiceNumber

    const a = document.createElement('a')
    a.href = fileUrl
    a.download = `invoice-${invoiceNumber}.pdf`
    a.click()
    URL.revokeObjectURL(fileUrl)
  }

  render() {
    const { data } = this.props
    if (!data) return null
    const { project, client, error, loading } = data

    if (error) return <p>{error.message}</p>
    if (loading) return <LoadingIcon />
    if (!project) return <p>Project not found</p>

    return (
      <DownloadInvoiceComponent>
        {(mutate, { error: mutationError, loading: mutationLoading }) => {
          return (
            <SingleProject
              project={project}
              client={client}
              selectedModal={this.state.selectedModal}
              handleOpenModal={this.handleOpenModal}
              handleCloseModal={this.handleCloseModal}
              handleDownload={this.downloadInvoice(mutate)}
              pdfLoading={mutationLoading}
              pdfError={mutationError && mutationError.message}
            />
          )
        }}
      </DownloadInvoiceComponent>
    )
  }
}

export default withGetSingleProject<IRouterComponentProps>({
  options: props => {
    return {
      variables: { id: props.match.params.id }
    }
  }
})(SingleProjectContainer)
