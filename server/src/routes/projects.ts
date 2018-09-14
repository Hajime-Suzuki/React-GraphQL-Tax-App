import * as Router from 'koa-router'
import { IProject, Project } from '../Models/Project'
import { IUser, User } from '../Models/User'
import { authMiddleware, IJwtPayload } from '../passport/passport'

interface IProjectForm {
  name: string
  date?: Date
}

const router = new Router({
  prefix: '/projects'
})

router.post('/', authMiddleware, async ctx => {
  const jwtPayload: IJwtPayload = (ctx.req as any).user

  const user = await User.findById(jwtPayload.id).populate('projects')
  if (!user) return ctx.throw(404, 'no user found')

  // const newProject = Project.create({ ...ctx.request.body, user: user._id })

  const newProject = new Project(ctx.request.body)
  newProject.user = user._id
  await newProject.save()

  const updated = await user.update({ $push: { projects: newProject._id } })

  ctx.status = 201
  ctx.body = updated
})

export default router
