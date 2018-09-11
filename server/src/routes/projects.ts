import * as Router from 'koa-router'
import { IProject, Project } from '../Models/Project'

const router = new Router({
  prefix: '/projects'
})

// router.get('/', async ctx => {
//   ctx.body = await Project.find()
// })

// router.post('/', async ctx => {
//   const newUserData = {
//     name: 'p1' + Math.random() * 100,
//     date: new Date()
//   }

//   const newProject: IProject = new Project(newUserData)
//   const p = await newProject.save()
//   ctx.status = 201
//   ctx.body = p
// })

export default router
