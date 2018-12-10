import { addDays, addMonths, format, subMonths } from 'date-fns'
import * as faker from 'faker'
import * as Router from 'koa-router'
import { ContactPerson } from '../Models/ContactPerson'
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

router.get('/:id', authMiddleware, async ctx => {
  const project = await Project.findById(ctx.params.id).populate(
    'contactPerson'
  )
  if (!project) ctx.throw(404, 'project not found')
  ctx.body = { project }
})

router.post('/', authMiddleware, async ctx => {
  const jwtPayload: IJwtPayload = (ctx.req as any).user
  const { contactPerson: contactPersonData, ...data } = ctx.request
    .body as IProject

  const user = await User.findById(jwtPayload.id).populate('projects')
  if (!user) return ctx.throw(404, 'no user found')

  const newProject = new Project(data)

  newProject.user = user.id

  if (contactPersonData) {
    const { firstName, lastName, email, phone, link } = contactPersonData

    // replace this to find by id later
    const existintContactPerson = await ContactPerson.findOne({
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email && { email }),
      ...(phone && { phone }),
      ...(link && { link })
    })

    if (existintContactPerson) {
      newProject.contactPerson = existintContactPerson._id
    } else {
      const newContactPerson = await ContactPerson.create(contactPersonData)
      newProject.contactPerson = newContactPerson._id
    }
  }

  await newProject.save()

  // user.update gets deplication warning
  await User.updateOne(
    { _id: user._id },
    { $push: { projects: newProject._id } }
  )

  console.log('update')
  const p = await Project.findById(newProject.id).populate(['contactPerson'])

  ctx.status = 201
  ctx.body = p
})

router.put('/:id/status', authMiddleware, async ctx => {
  const projectId: string = ctx.params.id
  const status: string = (ctx.request.body as any).status
  const project = await Project.findByIdAndUpdate(
    projectId,
    { status },
    { new: true }
  )
  ctx.body = project
})

router.put('/:id', authMiddleware, async ctx => {
  const projectId: string = ctx.params.id
  const data: IProjectBody = ctx.request.body as any

  const { incomes, expenses, ...generalInfo } = data
  console.log({ incomes, expenses, generalInfo })

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    {
      ...(incomes && { incomes }),
      ...(expenses && { expenses }),
      ...generalInfo
    },
    { new: true }
  )

  if (!updatedProject) return ctx.throw(404, 'project not found')

  ctx.body = {
    ...(incomes && { incomes: updatedProject.incomes }),
    ...(expenses && { expenses: updatedProject.expenses }),
    ...(generalInfo && { generalInfo })
  }
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
    password: 'ashtasht'
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
            price: faker.commerce.price(50, 300, 2),
            taxRate: taxRates[faker.random.number(2)],
            quantity: faker.random.number({ min: 1, max: 3 })
          }
        })
      const projectExpenses = Array(expensesAmount)
        .fill('')
        .map(__ => {
          return {
            name: faker.commerce.product(),
            price: faker.commerce.price(5, 50, 2),
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
        date,
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
        price: faker.commerce.price(10, 300, 2),
        quantity: faker.random.number({ min: 1, max: 3 }),
        taxRate: taxRates[faker.random.number(2)],
        date: faker.date.between(format(pastLimit, 'YYYY-MM-DD'), new Date()),
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
