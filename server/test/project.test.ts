import { IProject, Project } from '../src/Models/Project'
import { IUser, User } from '../src/Models/User'
import { startServer } from './server'

let request
beforeAll(async () => {
  request = await startServer()
  await Project.deleteMany({})
})

const projectData = {
  name: 'project',
  date: Date.now()
}

describe('---- Project ----', () => {
  test.only('add a project', async () => {
    const project: IProject = await request
      .post('/projects')
      .send(projectData)
      .expect(201)
      .then(({ body }) => body)

    expect(project.name).toBe('project')
  })
  test.only('add a project and user, and get user', async () => {
    const user: IUser = await User.create({
      firstName: 'asht',
      lastName: 'qdrw',
      password: 'asihoten',
      email: Math.random() + 'test@test.com'
    })
    const projectWithUser = { name: 'name', user: user.id }
    const project: IProject = await request
      .post('/projects')
      .send(projectWithUser)
      .expect(201)
      .then(({ body }) => body)

    expect(project.name).toBe('name')

    const p = await Project.findOne({ name: 'name' }).populate('user')

    expect(p.user.firstName).toBe('asht')
  })
})
