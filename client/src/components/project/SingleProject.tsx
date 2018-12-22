import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import format from 'date-fns/format'
import * as React from 'react'
import { GetSingleProject } from 'src/graphql/components/projects'
import styled from 'styled-components'
import EditFormModal from './modal/EditFormModal'
import ExpenseIncomeTable from './expenseIncomeTable/ExpenseIncomeTable'
import { Calculations } from './helper/calcutation'
import { Styles } from 'src/styles/sharedStyles'
import IconButton from '@material-ui/core/IconButton'

const ProjectDetails = styled(Styles.flexContainer)`
  .invoice-number,
  .invoice-date {
    width: 35%;
    text-align: left;
  }
  .edit-button {
    margin: 0 1em 2em;
  }
`
const InvoiceMeta: any = styled(Grid)`
  && {
    text-align: center;
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
  const { client, incomes, expenses } = project

  const prices = getPriceOverview(project)

  return (
    <Grid container justify="center" style={{ width: '100%' }}>
      {/* <EditFormModal
        isOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        confirmAndEdit={() => console.log('confirm!')}
        handleEntering={() => console.log('enter')}
        type={'something'}
        // key={type}
      >
        Test!!!!
      </EditFormModal> */}

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
      <Grid item xs={11} sm={10}>
        <Typography variant="display2">{project.name}</Typography>
      </Grid>
      <Grid item xs={11} sm={2}>
        <Grid container justify="flex-end">
          <InvoiceMeta item xs={5} sm={5}>
            <Icon className="far fa-file-alt" />
            <Typography className="invoice-number">
              {project.invoiceNumber}
            </Typography>
          </InvoiceMeta>
        </Grid>
        <Grid container justify="flex-end">
          <InvoiceMeta item xs={5} sm={5}>
            <Icon className="far fa-calendar-alt" />
            <Typography className="invoice-date">
              {project.invoiceDate
                ? format(project.invoiceDate, 'Y-MM-dd')
                : '-'}
            </Typography>
          </InvoiceMeta>
        </Grid>
        <Grid container justify="flex-end">
          <InvoiceMeta item xs={5} sm={5}>
            <Typography className="invoice-date">
              Status: {project.status}
            </Typography>
          </InvoiceMeta>
        </Grid>
      </Grid>
      <hr style={{ width: '100%' }} />

      {/* <Grid item xs={11} sm={6}>
          <Typography>Contact Person</Typography>
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
        </Grid> */}

      <hr style={{ width: '100%' }} />

      <Grid container item xs={12} spacing={40} justify="space-evenly">
        {incomes && (
          <Grid item xs={11} lg={6}>
            <Typography variant="title">Income</Typography>
            <IconButton onClick={() => console.log('open')}>
              <Icon className="fas fa-pen" />
            </IconButton>
            {/* <Grid item xs={11}> */}
            <ExpenseIncomeTable
              items={incomes}
              totalValues={prices.incomes}
              type="incomes"
            />
            {/* </Grid> */}
          </Grid>
        )}
        {expenses && (
          <Grid item xs={11} lg={6}>
            <Typography variant="title">Expense</Typography>
            <IconButton onClick={() => console.log('open')}>
              <Icon className="fas fa-pen" />
            </IconButton>

            <ExpenseIncomeTable
              items={expenses}
              totalValues={prices.expenses}
              type="expenses"
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}

const getPriceOverview = (project: Props['project']) => {
  const { incomes, expenses } = project
  return {
    incomes: {
      subtotal: incomes ? Calculations.getSubtotal(incomes) : '-',
      tax: incomes ? Calculations.getTaxTotal(incomes) : '-',
      total: incomes ? Calculations.getGrandTotal(incomes) : '-'
    },
    expenses: {
      tax: expenses ? Calculations.getTaxTotal(expenses) : '-',
      total: expenses ? Calculations.getSubtotal(expenses) : '-'
    }
  }
}

export default SingleProject
