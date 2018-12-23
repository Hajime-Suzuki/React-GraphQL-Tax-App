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
import { theme } from 'src/styles/theme'

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

interface Props {
  project: GetSingleProject.GetSingleProject
  isModalOpen: boolean
  handleOpenModal: () => void
  handleCloseModal: () => void
}

const SingleProject: React.SFC<Props> = props => {
  const { project, handleOpenModal, handleCloseModal, isModalOpen } = props

  return (
    <ProjectDetails container justify="center">
      <ButtonWrapper item xs={10} container justify="flex-end">
        <Button variant="outlined" color="primary" onClick={handleOpenModal}>
          Edit
        </Button>
      </ButtonWrapper>
      <InvoiceMetaSection {...props} />
      <hr style={{ width: '100%', margin: '2em 0' }} />
      <IncomesAndExpenseSection {...props} />
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
        align-items: center;
      }
    }
    .meta-item {
      width: 33%;
      text-align: center;
    }
  }
`

const InvoiceMetaSection: React.SFC<Props> = ({ project }) => {
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

const IncomesAndExpenseSection: React.SFC<Props> = ({ project }) => {
  const prices = getPriceOverview(project)
  const settings = [
    { type: 'incomes', title: 'Incomes', totalValues: prices.incomes },
    { type: 'expenses', title: 'Expenses', totalValues: prices.expenses }
  ]
  return (
    <Grid container item xs={12} spacing={40} justify="space-evenly">
      {settings.map(({ type, title, totalValues }) => {
        return (
          project[type] && (
            <Grid item xs={11} lg={6}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="title">{title}</Typography>
                <IconButton onClick={() => console.log('open')}>
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
        )
      })}
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
