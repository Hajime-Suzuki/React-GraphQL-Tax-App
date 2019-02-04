import { endOfQuarter, isAfter, isBefore, startOfQuarter } from 'date-fns'
import { createSelector } from 'reselect'
import { Calculations } from 'src/components/project/helper/calculations'
import {
  GetProjectOverview,
  PriceFragment
} from 'src/graphql/components/projects'

type TaxRate = '0' | '9' | '21'

const getIncomes = createSelector(
  [(projects: GetProjectOverview.Projects[]) => projects],
  projects => {
    const now = Date.now()
    const quarterStart = startOfQuarter(now)
    const quarterEnd = endOfQuarter(now)

    const filteredProjects = projects.filter(project => {
      const date = project.invoiceDate
      return isAfter(date, quarterStart) && isBefore(date, quarterEnd)
    })

    const incomes = [].concat(
      ...(filteredProjects
        .map(project => project.incomes)
        .filter(v => !!v) as any)
    ) as PriceFragment.Fragment[]
    return incomes
  }
)

const getCategorizedIncome = createSelector(
  [getIncomes],
  incomes => {
    const filteredIncomes = incomes.reduce(
      (total, income) => {
        if (typeof income.taxRate !== 'number') return total
        if (total[income.taxRate] === undefined) {
          total[income.taxRate] = []
          return total
        }

        total[income.taxRate].push(income)
        return total
      },
      {
        '0': [],
        '9': [],
        '21': []
      } as { [key in TaxRate]: PriceFragment.Fragment[] }
    )
    return filteredIncomes
  }
)

const getTotalValues = createSelector(
  [getCategorizedIncome],
  categorizedIncomes => {
    const categorizedTotal = (Object.keys(
      categorizedIncomes
    ) as TaxRate[]).reduce(
      (total, key) => {
        const incomes = categorizedIncomes[key]
        const totalValue = Calculations.getGrandTotal(incomes)
        const taxTotal = Calculations.getTaxTotal(incomes)

        total[key].incomes = totalValue
        total[key].tax = taxTotal

        return total
      },
      {
        '0': {
          incomes: '0',
          tax: '0'
        },
        '9': {
          incomes: '0',
          tax: '0'
        },
        '21': {
          incomes: '0',
          tax: '0'
        }
      } as { [key in TaxRate]: { incomes: string; tax: string } }
    )
    return categorizedTotal
  }
)

export const currentQuarterProjectSelector = {
  getTotalValues
}
