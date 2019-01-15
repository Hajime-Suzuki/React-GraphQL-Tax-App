import { UserRepository } from '../../src/services/user/repository'
import { User } from '../../src/services/user/model'
import { UserCommands } from '../../src/services/user/domain/commands'

describe('====== User Commands ======', () => {
  const instanceMethods = {
    generateToken: () => 'token',
    comparePassword: () => true
  }
  test('can create user', async () => {
    const userData = {
      firstName: 'test',
      lastName: 'user',
      email: 'test@test.com',
      password: '12345678'
    }

    const spy = jest.spyOn(UserRepository, 'create').mockImplementation(() => ({
      ...userData,
      ...instanceMethods
    }))

    const res = await UserCommands.registerUser(userData)

    expect(spy).toHaveBeenCalledWith(userData)
    expect(res).toBe('token')
  })

  test('can update user', async () => {
    const userData = {
      firstName: 'test',
      lastName: 'user',
      email: 'test@test.com',
      password: '12345678'
    }
    const userId = '1'

    const spy = jest
      .spyOn(UserRepository, 'update')
      .mockImplementation(() => ({ ...userData, ...instanceMethods }))

    const res = await UserCommands.updateUser(userId, userData)

    expect(spy).toHaveBeenCalledWith(userId, userData, { new: true })
    expect(res).toHaveProperty('firstName')
    expect(res).toHaveProperty('lastName')
    expect(res).toHaveProperty('email')
  })
})
