import {
  endOfQuarter,
  isAfter,
  isBefore,
  startOfQuarter,
  parseISO
} from 'date-fns'
import { createSelector } from 'reselect'
import { Calculations } from 'src/view/project/helper/calculations'
import {
  GetProjectOverviewQuery,
  PriceFragmentFragment
} from 'src/graphql/components/projects'

type TaxRate = '0' | '9' | '21'
type IncomeOrExpense = PriceFragmentFragment
interface GetProjectsArg {
  date: number | Date
}

// TODO: convert these functions into class, or remove createSelector and user it with useMemo

const getProjects = ({ date }: GetProjectsArg) =>
  createSelector(
    [(projects: GetProjectOverviewQuery['projects']) => projects],
    projects => {
      const quarterStart = startOfQuarter(date)
      const quarterEnd = endOfQuarter(date)

      const filteredProjects = projects.filter(project => {
        const date = parseISO(project.invoiceDate)
        return isAfter(date, quarterStart) && isBefore(date, quarterEnd)
      })

      return filteredProjects
    }
  )

const getIncomes = ({ date }: GetProjectsArg) =>
  createSelector(
    [getProjects({ date })],
    projects => {
      const incomes = [].concat(
        ...(projects.map(project => project.incomes).filter(v => !!v) as any)
      ) as IncomeOrExpense[]
      return incomes
    }
  )

const getCategorizedIncome = ({ date }: GetProjectsArg) =>
  createSelector(
    [getIncomes({ date })],
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

const getTotalIncomes = ({ date }: GetProjectsArg) =>
  createSelector(
    [getCategorizedIncome({ date })],
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

const getTotalExpenses = ({ date }: GetProjectsArg) =>
  createSelector(
    getProjects({ date }),
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
