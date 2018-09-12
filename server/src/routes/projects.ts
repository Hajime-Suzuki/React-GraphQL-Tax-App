import * as Router from 'koa-router'
import { IProject, Project } from '../Models/Project'

interface IProjectForm {
  name: string
  date?: Date
}

const router = new Router({
  prefix: '/projects'
})

// router.get('/', async ctx => {
//   ctx.body = await Project.find()
// })

router.post('/', async ctx => {
  const data = ctx.request.body

  const newProject: IProject = new Project(data)
  const p = await newProject.save()
  ctx.status = 201
  ctx.body = p
})

export default router
