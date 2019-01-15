import { UserRepository } from '../../src/services/user/repository'

export const createUserAndGetToken = async (userData: any) => {
  const user = await UserRepository.create(userData)
  return { user, token: user.generateToken() }
}

export const Helpers = {
  createUserAndGetToken
}
