import {
  LoginUserMutationArgs,
  RegisterUserMutationArgs,
  UpdateUserMutationArgs
} from '../@types/types'
import { UserRepository } from './repository'

const registerUser = async (data: RegisterUserMutationArgs) => {
  try {
    const newUser = await UserRepository.create(data)
    return newUser.generateToken()
  } catch (e) {
    throw new Error(e)
  }
}

const loginUser = async ({ email, password }: LoginUserMutationArgs) => {
  try {
    const user = await UserRepository.findByCondition(
      { email },
      { password: true }
    )
    if (!user) throw new Error('email and password does not match ')
    if (!(await user.comparePassword(password))) {
      throw new Error('email and password does not match ')
    }
    return user.generateToken()
  } catch (e) {
    throw new Error(e)
  }
}

const updateUser = async (
  userId: string,
  data: UpdateUserMutationArgs['data']
) => {
  try {
    const updatedUser = await UserRepository.update(userId, data, {
      new: true
    })
    if (!updatedUser) throw new Error('can not update user')
    return updatedUser
  } catch (e) {
    throw new Error(e)
  }
}

export const UserDomain = {
  registerUser,
  loginUser,
  updateUser
}
