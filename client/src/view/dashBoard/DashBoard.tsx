import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import React, { FC, useContext } from 'react'
import {
  GetProjectOverviewQuery,
  useGetProjectOverviewQuery
} from 'src/graphql/components/projects'
import { JWT } from 'src/libs/jwt'
import { LoadingIcon } from '../UI/LoadingIcon'
import { SelectedQuarterContext, SelectedQuarterProvider } from './contexts'
import { currentQuarterProjectSelector as currentSemester } from './selectors/currentQuarter'
import TaxOverview from './TaxOverview'
import { Button } from '@material-ui/core'
import useRouter from 'use-react-router'
import { RoutesNames } from 'src/routes/constants'

const DashBoard: FC<{}> = () => {
  const userId = JWT.getUserId()

  const { data, loading, error } = useGetProjectOverviewQuery({
    variables: { userId: userId || '' }
  })

  const {
    selectedQuarter,
    selectedYear,
    previousQuarter,
    nextQuarter,
    selectedDate
  } = useContext(SelectedQuarterContext)

  const { history } = useRouter()

  if (!data) return null
  if (loading) return <LoadingIcon />
  if (error) return <Typography>{error.message}</Typography>

  const projects = data.projects

  if (!data.projects || (data.projects && !data.projects.length)) {
    return <Typography variant="h4">You don't have a project yet</Typography>
  }

  return (
    <>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <IconButton onClick={previousQuarter} size="small">
            <Icon className="fas fa-chevron-left" color="secondary" />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography>
            {selectedYear} Q{selectedQuarter}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={nextQuarter} size="small">
            <Icon className="fas fa-chevron-right" color="secondary" />
          </IconButton>
        </Grid>
      </Grid>

      {/* TODO: make it dynamic */}
      <Button onClick={() => history.push(RoutesNames.fiscalOverview(2019))}>
        Fiscal 2019
      </Button>
      <Typography variant="h4">Overview</Typography>
      <Typography variant="subtitle1">Incomes and Tax</Typography>
      <TaxOverview
        items={genTaxOverviewsItems({ projects, date: selectedDate })}
        type="incomes"
      />
      <div style={{ marginTop: '3em' }} />
      <Typography variant="subtitle1">Expense</Typography>
      <TaxOverview
        items={genExpenseOverviewItems({ projects, date: selectedDate })}
        type="expenses"
      />
    </>
  )
}

interface GetTableSettingsArgs {
  projects: GetProjectOverviewQuery['projects']
  date: number | Date
}

const genTaxOverviewsItems = ({ projects, date }: GetTableSettingsArgs) => {
  const grandTotalIncomes = currentSemester.getTotalIncomes({ date })(projects)
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

const genExpenseOverviewItems = ({ projects, date }: GetTableSettingsArgs) => {
  const { taxTotal, grandTotal } = currentSemester.getTotalExpenses({ date })(
    projects
  )
  return [
    {
      taxRate: 'all',
      expenses: grandTotal,
      tax: taxTotal
    }
  ]
}

export default () => (
  <SelectedQuarterProvider>
    <DashBoard />
  </SelectedQuarterProvider>
)
