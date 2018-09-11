import * as Router from 'koa-router'

const projectRoutes = new Router({
  prefix: '/projects'
})

projectRoutes.get('/', async ctx => {
  ctx.body = 'projects'
})

export default projectRoutes
