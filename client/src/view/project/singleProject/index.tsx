import * as React from 'react'
import {
  DownloadInvoiceMutation,
  DownloadInvoiceMutationVariables,
  DownloadInvoiceComponent,
  GetSingleProjectProps,
  Project,
  Client,
  withGetSingleProject,
} from 'src/graphql/components/projects'
import { IRouterComponentProps } from 'src/routes/types'
import { LoadingIcon } from '../../UI/LoadingIcon'
import SingleProject from './SingleProject'
import { MutationFn } from 'react-apollo'
import { QSingleProject } from 'src/graphql/@types/types'

export type ModalType = 'basic' | 'incomes' | 'expenses' | 'client'

export interface SingleProjectChildProps {
  project: NonNullable<QSingleProject>
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

  handleOpenModal = (type: ModalType) => () => this.setState({ selectedModal: type })

  handleCloseModal = () => this.setState({ selectedModal: undefined })

  downloadInvoice = (
    download: MutationFn<DownloadInvoiceMutation, DownloadInvoiceMutationVariables>,
  ) => async () => {
    const res = await download({
      variables: { projectId: this.props.match.params.id },
    })
    if (!res || !res.data || !res.data.downloadInvoice) return

    window.open(res.data.downloadInvoice.data)
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
      variables: { id: props.match.params.id },
    }
  },
})(SingleProjectContainer)
