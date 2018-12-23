import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import format from 'date-fns/format'
import * as React from 'react'
import { theme } from 'src/styles/theme'
import styled from 'styled-components'
import ExpenseIncomeTable from './expenseIncomeTable/ExpenseIncomeTable'
import { Calculations } from './helper/calculations'
import EditFormModal from './modal/EditFormModal'
import { SingleProjectChildProps } from './SingleProjectContainer'
import { EditExpenseAndIncomeForm } from './formConponents/incomesAndExpensesForm/EditIncomesAndExpenseForm'

const phone = theme.breakpoints.down('sm')
const tablet = theme.breakpoints.up('md')

const ProjectDetails: any = styled(Grid)`
  width: 100%;
`

const ButtonWrapper: any = styled(Grid)`
  && {
    margin: 2em;
  }
`

const SingleProject: React.SFC<SingleProjectChildProps> = props => {
  const {
    project: { client, expenses, incomes },
    handleOpenModal,
    handleCloseModal,
    selectedModal,
    handleSubmit
  } = props

  return (
    <ProjectDetails container justify="center">
      <ButtonWrapper item xs={10} container justify="flex-end">
        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpenModal('base')}
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
            </React.Fragment>
          </Grid>
        </React.Fragment>
      )}
      <hr style={{ width: '100%', margin: '2em 0' }} />
      <IncomesAndExpenseSection {...props} />

      {incomes && (
        <EditFormModal
          title="Edit Incomes"
          handleCloseModal={handleCloseModal('incomes')}
          isOpen={selectedModal === 'incomes'}
          handleConfirm={handleSubmit}
        >
          <EditExpenseAndIncomeForm incomes={incomes as any} />
        </EditFormModal>
      )}
      {expenses && (
        <EditFormModal
          title="Edit Incomes"
          handleCloseModal={handleCloseModal('expenses')}
          isOpen={selectedModal === 'expenses'}
          handleConfirm={handleSubmit}
        >
          <EditExpenseAndIncomeForm expenses={expenses as any} />
        </EditFormModal>
      )}
    </ProjectDetails>
  )
}

const InvoiceMetaSectionWrapper: any = styled(Grid)`
  && {
    .title {
      text-align: center;
      ${phone} {
        margin-bottom: 20px;
      }
      ${tablet} {
        text-align: left;
      }
    }
    .details-wrapper {
      flex-direction: row;
      ${phone} {
        justify-content: center;
      }
      ${tablet} {
        justify-content: flex-end;
      }
    }
    .meta-item {
      width: 33%;
      text-align: center;
    }
  }
`

const InvoiceMetaSection: React.SFC<SingleProjectChildProps> = ({
  project
}) => {
  return (
    <InvoiceMetaSectionWrapper
      item
      container
      alignItems="center"
      justify="center"
    >
      <Grid item xs={11} md={10}>
        <Typography variant="display2" className="title">
          {project.name}
        </Typography>
      </Grid>

      <Grid className="details-wrapper" item container xs={11} md={1}>
        <Grid className="meta-item" item xs={3} md={10}>
          <Icon className="far fa-file-alt" />
          <Typography className="invoice-number">
            {project.invoiceNumber}
          </Typography>
        </Grid>

        <Grid className="meta-item" item xs={3} md={10}>
          <Icon className="far fa-calendar-alt" />
          <Typography className="invoice-date">
            {project.invoiceDate ? format(project.invoiceDate, 'Y-MM-dd') : '-'}
          </Typography>
        </Grid>

        <Grid className="meta-item" item xs={3} md={10}>
          <Icon className="fas fa-check" />
          <Typography className="invoice-date">{project.status}</Typography>
        </Grid>
      </Grid>
    </InvoiceMetaSectionWrapper>
  )
}

const IncomesAndExpenseSection: React.SFC<SingleProjectChildProps> = ({
  project,
  handleOpenModal
}) => {
  const prices = getPriceOverview(project)
  const settings = [
    { type: 'incomes', title: 'Incomes', totalValues: prices.incomes },
    { type: 'expenses', title: 'Expenses', totalValues: prices.expenses }
  ]
  return (
    <Grid container item xs={12} spacing={40} justify="space-evenly">
      {settings.map(
        ({ type, title, totalValues }, i) =>
          project[type] && (
            <Grid item xs={11} lg={6} key={i}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="title" color="secondary">
                  {title}
                </Typography>
                <IconButton onClick={handleOpenModal(type)}>
                  <Icon className="fas fa-pen" />
                </IconButton>
              </div>

              <ExpenseIncomeTable
                items={project[type]}
                totalValues={totalValues}
                type={type as any}
              />
            </Grid>
          )
      )}
    </Grid>
  )
}

const getPriceOverview = (project: SingleProjectChildProps['project']) => {
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
