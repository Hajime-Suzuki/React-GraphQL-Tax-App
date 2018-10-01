import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import format from 'date-fns/format'
import React, { Fragment } from 'react'
import styled from 'styled-components'
import {
  calcOnlyTax,
  calcTotalvalueWithoutTax
} from '../../libs/singleProject/totalValues'
import ExpenseIncomeTable from './expenseIncomeTable/ExpenseIncomeTable'

const ProjectDetails = styled(Grid)`
  .invoice-number,
  .invoice-date {
    width: 30%;
    text-align: left;
  }
`

const SingleProject = ({ project: p, openModal }) => {
  if (!p) return null
  const c = p.get('contactPerson')
  const totalIncomeExcl = calcTotalvalueWithoutTax(p.get('incomes'))
  const totalExpensesExcl = calcTotalvalueWithoutTax(p.get('expenses'))
  const totalIncomeTax = calcOnlyTax(p.get('incomes'))
  const totalExpenseTax = calcOnlyTax(p.get('expenses'))
  return (
    <div>
      <ProjectDetails container justify="center">
        <Grid item xs={11} sm={6}>
          <Typography variant="display2">{p.get('name')}</Typography>
        </Grid>
        <Grid item xs={11} sm={6}>
          <Grid container justify="flex-end">
            <Icon className="far fa-file-alt" />
            <Typography className="invoice-number">
              {p.get('invoiceNumber')}
            </Typography>
          </Grid>
          <Grid container justify="flex-end">
            <Icon className="far fa-calendar-alt" />
            <Typography className="invoice-date">
              {format(p.get('date'), 'YYYY-MM-DD')}
            </Typography>
          </Grid>
          <Grid container justify="flex-end">
            <Typography className="invoice-date">
              Status: {p.get('status')}
            </Typography>
          </Grid>
        </Grid>
        <hr style={{ width: '100%' }} />
        <Grid item xs={11} sm={6}>
          <Typography>Price(Excl.): €{totalIncomeExcl}</Typography>
          <Typography>
            Price(Incl.): €
            {Math.round((totalIncomeExcl + totalIncomeTax) * 100) / 100}
          </Typography>
          <Typography>
            Tax: €{Math.round((totalIncomeTax - totalExpenseTax) * 100) / 100}
          </Typography>
          <Typography>Expense: €{totalExpensesExcl}</Typography>
        </Grid>
        <Grid item xs={11} sm={6}>
          <Typography>Contact Person</Typography>
          {c ? (
            <Fragment>
              <Typography>
                <a href={c.get('link')} target="_blank">
                  {c.get('firstName')} {c.get('lastName')}
                </a>
              </Typography>
              <Typography>{c.get('email')}</Typography>
              <Typography>{c.get('phone')}</Typography>
            </Fragment>
          ) : (
            '-'
          )}
        </Grid>
        <hr style={{ width: '100%' }} />
        <Grid container item xs={11} justify="space-evenly">
          <Grid item sm={11} lg={5}>
            <Typography variant="title">Income</Typography>
            <IconButton onClick={() => openModal('isIncomeModalOpen')}>
              <Icon className="fas fa-pen" />
            </IconButton>
            <ExpenseIncomeTable items={p.get('incomes')} />
          </Grid>
          <Grid item sm={11} lg={5}>
            <Typography variant="title">Expense</Typography>
            <IconButton onClick={() => openModal('isExpenseModalOpen')}>
              <Icon className="fas fa-pen" />
            </IconButton>
            <ExpenseIncomeTable items={p.get('expenses')} />
          </Grid>
        </Grid>
      </ProjectDetails>
    </div>
  )
}

export default SingleProject
