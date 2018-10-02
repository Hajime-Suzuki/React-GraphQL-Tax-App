import * as Router from 'koa-router'
import { ContactPerson } from '../Models/ContactPerson'
import { IExpenseAndIncome, IProject, Project } from '../Models/Project'
import { IUser, User } from '../Models/User'
import { authMiddleware, IJwtPayload } from '../passport/passport'

interface IProjectForm {
  name: string
  date?: Date
}

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
  newProject.user = user._id

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

  // console.log(updatedProject)

  ctx.body = {
    ...(incomes && { incomes: updatedProject.incomes }),
    ...(expenses && { expenses: updatedProject.expenses }),
    ...(generalInfo && { generalInfo })
  }
  // ctx.body = { updatedProject }
})

export default router
