import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { EditIcon } from 'src/components/UI/EditIcon'
import styled from 'styled-components'
import { SingleProjectChildProps } from '.'
import IncomesAndExpenseSection from './components/IncomesAndExpenseSection'
import InvoiceMetaSection from './components/InvoiceMetaSection'
import { EditModals } from './editModalSection'

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
  const { handleOpenModal, client } = props

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
      {client && (
        <React.Fragment>
          <hr style={{ width: '100%', margin: '2em 0' }} />
          <Grid item xs={11} sm={6}>
            <Typography>Contact Person</Typography>
            <React.Fragment>
              <Typography>
                {client.firstName} {client.lastName}
              </Typography>
              <Typography>{client.email}</Typography>
              <Typography>{client.phone}</Typography>
              <EditIcon
                onClick={handleOpenModal('client')}
                style={{ marginLeft: '10px' }}
              />
            </React.Fragment>
          </Grid>
        </React.Fragment>
      )}
      <hr style={{ width: '100%', margin: '2em 0' }} />
      <IncomesAndExpenseSection {...props} />
      <EditModals {...props} />
    </ProjectDetails>
  )
}

export default SingleProject
