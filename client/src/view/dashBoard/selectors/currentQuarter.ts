import {
  endOfQuarter,
  isAfter,
  isBefore,
  startOfQuarter,
  parseISO
} from 'date-fns'
import { createSelector } from 'reselect'
import { Calculations } from 'src/view/project/helper/calculations'
import { PriceFragment } from 'src/graphql/components/clients'
import { GetProjectOverviewQuery } from 'src/graphql/components/projects'

type TaxRate = '0' | '9' | '21'
type IncomeOrExpense = PriceFragment.Fragment

const getProjects = createSelector(
  [(projects: GetProjectOverviewQuery['projects']) => projects],
  projects => {
    const now = Date.now()
    const quarterStart = startOfQuarter(now)
    const quarterEnd = endOfQuarter(now)

    const filteredProjects = projects.filter(project => {
      const date = parseISO(project.invoiceDate)
      return isAfter(date, quarterStart) && isBefore(date, quarterEnd)
    })

    return filteredProjects
  }
)

const getIncomes = createSelector(
  [getProjects],
  projects => {
    const incomes = [].concat(
      ...(projects.map(project => project.incomes).filter(v => !!v) as any)
    ) as IncomeOrExpense[]
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
      } as Record<TaxRate, IncomeOrExpense[]>
    )
    return filteredIncomes
  }
)

const getTotalIncomes = createSelector(
  [getCategorizedIncome],
  categorizedIncomes => {
    const categorizedTotal = (Object.keys(
      categorizedIncomes
    ) as TaxRate[]).reduce(
      (total, key) => {
        const incomes = categorizedIncomes[key]
        const totalValue = Calculations.getSubtotal(incomes)
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
      } as Record<TaxRate, { incomes: string; tax: string }>
    )
    return categorizedTotal
  }
)

const getTotalExpenses = createSelector(
  getProjects,
  projects => {
    const expenses = [].concat(
      ...(projects.map(p => p.expenses).filter(v => !!v) as any)
    ) as IncomeOrExpense[]

    const taxTotal = Calculations.getTaxTotal(expenses)
    const grandTotal = Calculations.getSubtotal(expenses)
    return {
      taxTotal,
      grandTotal
    }
  }
)

export const currentQuarterProjectSelector = {
  getTotalIncomes,
  getTotalExpenses
}
