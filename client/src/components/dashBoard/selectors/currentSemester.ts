import { createSelector } from 'reselect'
import { GetProjectOverview } from 'src/graphql/components/projects'
import { startOfQuarter, endOfQuarter, isAfter, isBefore } from 'date-fns'
import { Calculations } from 'src/components/project/helper/calculations'
import { Currency } from 'src/libs/currency'

const getProject = createSelector(
  [(projects: GetProjectOverview.Projects[]) => projects],
  projects => {
    const now = Date.now()
    const quarterStart = startOfQuarter(now)
    const quarterEnd = endOfQuarter(now)

    return projects.filter(project => {
      const date = project.projectDate
      return isAfter(date, quarterStart) && isBefore(date, quarterEnd)
    })
  }
)

const getTotalIncomes = createSelector(
  [getProject],
  projects => {
    const grandTotal = projects.reduce((total, project) => {
      total += project.incomes
        ? +Calculations.getGrandTotal(project.incomes, { format: false })
        : 0
      return total
    }, 0)
    return Currency.format(grandTotal)
  }
)

// TODO: Change query to calculate incomes after deduct expenses.
const getTaxTotal = createSelector(
  [getProject],
  projects => {
    return projects
    // const grandTotalTax = projects.reduce((total, project) => {
    //   total += project.expense
    //     ? +Calculations.getGrandTotal(project.expenses, { format: false })
    //     : 0
    //   return total
    // }, 0)
    // return Currency.format(grandTotalTax)
  }
)

export const currentSemesterProjectSelector = {
  getProject,
  getTotalIncomes,
  getTaxTotal
}
