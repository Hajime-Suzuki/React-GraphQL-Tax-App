import React, { FC, useContext } from 'react'
import { GetProjectOverview } from 'src/graphql/components/projects'
import TaxOverview from './TaxOverview'
import Typography from '@material-ui/core/Typography'
import { currentQuarterProjectSelector as currentSemester } from './selectors/currentQuarter'
import { SelectedQuarterContext } from './contexts'

export interface DashBoardProps {
  projects: GetProjectOverview.Projects[]
}

const DashBoard: FC<DashBoardProps> = props => {
  const { projects } = props
  const { selectedQuarter } = useContext(SelectedQuarterContext)
  return (
    <>
      <Typography variant="h4">Overview</Typography>
      <Typography variant="subheading">Incomes and Tax</Typography>
      <TaxOverview items={genTaxOverviewsItems({ projects })} type="incomes" />
      <div style={{ marginTop: '3em' }} />
      <Typography variant="subheading">Expense</Typography>
      <TaxOverview
        items={genExpenseOverviewItems({ projects })}
        type="expenses"
      />
    </>
  )
}

interface GetTableSettingsArgs {
  projects: DashBoardProps['projects']
}

const genTaxOverviewsItems = ({ projects }: GetTableSettingsArgs) => {
  const grandTotalIncomes = currentSemester.getTotalIncomes(projects)

  return [
    {
      taxRate: '21%',
      incomes: grandTotalIncomes['21'].incomes,
      tax: grandTotalIncomes['21'].tax
    },
    {
      taxRate: '9%',
      incomes: grandTotalIncomes['9'].incomes,
      tax: grandTotalIncomes['9'].tax
    },
    {
      taxRate: '0%',
      incomes: grandTotalIncomes['0'].incomes,
      tax: grandTotalIncomes['0'].tax
    }
  ]
}

const genExpenseOverviewItems = ({ projects }: GetTableSettingsArgs) => {
  const { taxTotal, grandTotal } = currentSemester.getTotalExpenses(projects)
  return [
    {
      taxRate: 'all',
      expenses: grandTotal,
      tax: taxTotal
    }
  ]
}

export default DashBoard