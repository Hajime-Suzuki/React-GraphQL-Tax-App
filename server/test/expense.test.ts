import { Expense, IExpense } from '../src/Models/Expense'
import { IProject, Project } from '../src/Models/Project'
import { IUser, User } from '../src/Models/User'
import { startServer } from './server'

let request

const userData = {
  firstName: 'first',
  lastName: 'last',
  email: 'test@test.com',
  password: 'password'
}

let token

beforeAll(async () => {
  request = await startServer()
  const [user, ...rest] = await Promise.all([
    User.create(userData),
    Project.deleteMany({}),
    Expense.deleteMany({}),
    User.deleteMany({})
  ])

  token = user.generateToken()
})

const projectData = {
  name: 'expense',
  price: 12,
  quantity: 1,
  taxRate: 21,
  date: new Date()
}

describe('---- Expense ----', () => {
  test('add a expense', async () => {
    const data = await request
      .post('/expenses')
      .set('Authorization', token)
      .send(projectData)
      .expect(201)
      .then(({ body }) => body)

    const expense: IExpense = data.expense
    expect(expense.name).toBe('expense')
  })
})
