import {
  LoginUserMutationArgs,
  RegisterUserMutationArgs,
  UpdateUserMutationArgs
} from '../@types/types'
import { UserInfra } from './infra'

export const getUserById = async (id: string) => {
  const user = await UserInfra.getUserById(id)
  if (!user) throw new Error('user not found')
  return user
}

export const registerUser = async (data: RegisterUserMutationArgs) => {
  try {
    const newUser = await UserInfra.addUser(data)
    return newUser.generateToken()
  } catch (e) {
    throw new Error(e)
  }
}

export const loginUser = async ({ email, password }: LoginUserMutationArgs) => {
  try {
    const user = await UserInfra.getUserByCondition({ email }).select(
      '+password'
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

export const updateUser = async (
  userId: string,
  data: UpdateUserMutationArgs['data']
) => {
  try {
    const updatedUser = await UserInfra.updateUser(userId, data, {
      new: true
    })
    if (!updatedUser) throw new Error('can not update user')
    return updatedUser
  } catch (e) {
    throw new Error(e)
  }
}
