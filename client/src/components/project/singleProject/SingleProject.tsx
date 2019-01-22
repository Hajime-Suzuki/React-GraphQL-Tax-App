import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import * as React from 'react'
import styled from 'styled-components'
import { SingleProjectChildProps } from '.'
import IncomesAndExpenseSection from './components/IncomesAndExpenseSection'
import { EditModals } from './editModalSection'
import ClientSection from './components/ClientSection'
import InvoiceMetaSection from './components/InvoiceMetasection'

const ProjectDetails: any = styled(Grid)`
  width: 100%;
`

const ButtonWrapper: any = styled(Grid)`
  && {
    margin: 2em;
  }
`

const SingleProject: React.FunctionComponent<
  SingleProjectChildProps
> = props => {
  const { handleOpenModal } = props

  return (
    <ProjectDetails container justify="center">
      <ButtonWrapper item xs={10} container justify="flex-end">
        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpenModal('basic')}
        >
          Edit
        </Button>
      </ButtonWrapper>
      <InvoiceMetaSection {...props} />
      <ClientSection {...props} />
      <hr style={{ width: '100%', margin: '2em 0' }} />
      <IncomesAndExpenseSection {...props} />
      <EditModals {...props} />
    </ProjectDetails>
  )
}

export default SingleProject
