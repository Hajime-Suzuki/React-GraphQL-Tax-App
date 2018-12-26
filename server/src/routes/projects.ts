import { addDays, addMonths, format, subMonths } from 'date-fns'
import * as faker from 'faker'
import * as Router from 'koa-router'
import { Client } from '../Models/Client'
import { Expense } from '../Models/Expense'
import { Project } from '../Models/Project'
import { User } from '../Models/User'
import { authMiddleware, IJwtPayload } from '../passport/passport'
import { IProject, IExpenseAndIncome } from '../GraphQL/@types/types'

interface IProjectBody {
  incomes: IExpenseAndIncome[]
  expenses: IExpenseAndIncome[]
}

const router = new Router({
  prefix: '/projects'
})

router.post('/populate', async ctx => {
  await Project.deleteMany({})
  await Expense.deleteMany({})

  const email = (ctx as any).request.body.email

  const user = await User.findOne({ email })
  if (user) await user.remove()
  const newUser = new User({
    firstName: 'test',
    lastName: 'user',
    email,
    password: 'ashtashtasht'
  })

  const projectAmount = 50
  const nonProjectExpensesAomunt = 20

  const futureLimit = addMonths(new Date(), 1)
  const pastLimit = subMonths(new Date(), 6)
  const taxRates = [0, 6, 21]

  const projects = Array(projectAmount)
    .fill('')
    .map(_ => {
      const incomesAmount = faker.random.number({ min: 1, max: 3 })
      const expensesAmount = faker.random.number(5)

      const projectIncomes = Array(incomesAmount)
        .fill('')
        .map(__ => {
          return {
            name: faker.commerce.product(),
            price: faker.finance.amount(50, 300, 2),
            taxRate: taxRates[faker.random.number(2)],
            quantity: faker.random.number({ min: 1, max: 3 })
          }
        })
      const projectExpenses = Array(expensesAmount)
        .fill('')
        .map(__ => {
          return {
            name: faker.commerce.product(),
            price: faker.finance.amount(5, 50, 2),
            taxRate: taxRates[faker.random.number(2)],
            quantity: faker.random.number({ min: 1, max: 3 })
          }
        })

      const date = faker.date.between(
        format(pastLimit, 'YYYY-MM-DD'),
        format(futureLimit, 'YYYY-MM-DD')
      )
      const invoiceDate = faker.date.between(
        format(date, 'YYYY-MM-DD'),
        format(addDays(date, 15))
      )

      const invoiceStatus = ['none', 'invoice', 'paid'][faker.random.number(2)]
      return new Project({
        invoiceNumber: String(faker.random.number(100000)),
        name: faker.commerce.productName() + faker.random.number(100),
        streetAddress: faker.address.streetAddress(true),
        city: faker.address.city(),
        status: invoiceStatus,
        user: newUser._id,
        expenses: projectExpenses,
        incomes: projectIncomes,
        projectDate: date,
        invoiceDate:
          invoiceStatus === 'none' || invoiceDate > new Date()
            ? null
            : invoiceDate
      })
    })

  const expenses = Array(nonProjectExpensesAomunt)
    .fill('')
    .map(_ => {
      return new Expense({
        name: faker.commerce.productName(),
        price: faker.finance.amount(10, 300, 2),
        quantity: faker.random.number({ min: 1, max: 3 }),
        taxRate: taxRates[faker.random.number(2)],
        projectDate: faker.date.between(
          format(pastLimit, 'YYYY-MM-DD'),
          new Date()
        ),
        user: newUser._id
      })
    })

  const savedProjects = await Project.insertMany(projects)
  const savedExpenses = await Expense.insertMany(expenses)

    // tslint:disable-next-line:align
  ; (newUser as any).expenses = savedExpenses
  newUser.projects = savedProjects
  await newUser.save()
  ctx.body = savedProjects
})
export default router
