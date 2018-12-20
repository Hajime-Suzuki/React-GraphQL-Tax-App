import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import format from 'date-fns/format'
import * as React from 'react'
import { GetSingleProject } from 'src/graphql/components/projects'
import styled from 'styled-components'
import EditFormModal from './modal/EditFormModal'

const ProjectDetails: any = styled(Grid)`
  .invoice-number,
  .invoice-date {
    width: 30%;
    text-align: left;
  }
  .edit-button {
    margin: 0 1em 2em;
  }
`

interface Props {
  project: GetSingleProject.GetSingleProject
  isModalOpen: boolean
  handleOpenModal: () => void
  handleCloseModal: () => void
}
const SingleProject: React.SFC<Props> = props => {
  const { project, handleOpenModal, handleCloseModal, isModalOpen } = props
  const { client } = project
  return (
    <div>
      <EditFormModal
        isOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        confirmAndEdit={() => console.log('confirm!')}
        handleEntering={() => console.log('enter')}
        type={'something'}
        // key={type}
      >
        Test!!!!
      </EditFormModal>

      <ProjectDetails container justify="center">
        <Grid item xs={12} container justify="flex-end">
          <Button
            variant="outlined"
            color="primary"
            className="edit-button"
            onClick={handleOpenModal}
          >
            Edit
          </Button>
        </Grid>
        <Grid item xs={11} sm={6}>
          <Typography variant="display2">{project.name}</Typography>
        </Grid>
        <Grid item xs={11} sm={6}>
          <Grid container justify="flex-end">
            <Icon className="far fa-file-alt" />
            <Typography className="invoice-number">
              {project.invoiceNumber}
            </Typography>
          </Grid>
          <Grid container justify="flex-end">
            <Icon className="far fa-calendar-alt" />
            <Typography className="invoice-date">
              {project.invoiceDate
                ? format(project.invoiceDate, 'Y-MM-dd')
                : '-'}
            </Typography>
          </Grid>
          <Grid container justify="flex-end">
            <Typography className="invoice-date">
              Status: {project.status}
            </Typography>
          </Grid>
        </Grid>
        <hr style={{ width: '100%' }} />
        <Grid item xs={11} sm={6}>
          <p>incomes</p>
        </Grid>
        <Grid item xs={11} sm={6}>
          <Typography>Client</Typography>
          {client ? (
            <React.Fragment>
              <Typography>
                {client.firstName} {client.lastName}
              </Typography>
              <Typography>{client.email}</Typography>
              <Typography>{client.phone}</Typography>
            </React.Fragment>
          ) : (
            '-'
          )}
        </Grid>
        <hr style={{ width: '100%' }} />
        ExpenseIncomeTable
      </ProjectDetails>
    </div>
  )
}

export default SingleProject
