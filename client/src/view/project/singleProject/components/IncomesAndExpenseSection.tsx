import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { EditIcon } from 'src/view/UI/EditIcon'
import { SingleProjectChildProps } from '..'
import { Calculations } from '../../helper/calculations'
import { ModalType } from '../index'
import ExpenseIncomeTable from './ExpenseIncomeTable'

const IncomesAndExpenseSection: React.FunctionComponent<
  SingleProjectChildProps
> = ({ project, handleOpenModal }) => {
  const prices = getPriceOverview(project)
  const settings = [
    {
      type: 'incomes' as ModalType,
      title: 'Incomes',
      totalValues: prices.incomes
    },
    {
      type: 'expenses' as ModalType,
      title: 'Expenses',
      totalValues: prices.expenses
    }
  ]
  return (
    <Grid container item xs={12} spacing={5} justify="space-evenly">
      {settings.map(
        ({ type, title, totalValues }, i) =>
          project[type] && (
            <Grid item xs={11} lg={6} key={i}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" color="secondary">
                  {title}
                </Typography>
                <EditIcon
                  onClick={handleOpenModal(type)}
                  style={{ marginLeft: '10px' }}
                />
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
      subtotal: expenses ? Calculations.getSubtotal(expenses) : '-',
      total: expenses ? Calculations.getGrandTotal(expenses) : '-'
    }
  }
}

export default IncomesAndExpenseSection
