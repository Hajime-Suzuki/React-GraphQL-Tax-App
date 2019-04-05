import {
  RegisterUserMutationArgs,
  UpdateUserMutationArgs,
  IUser
} from '../../@types/types'
import { UserRepository } from '../repository'

const registerUser = async (data: RegisterUserMutationArgs) => {
  try {
    const newUser = await UserRepository.create(data)
    return newUser.generateToken()
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

const changePassword = async (email: IUser['email'], newPassword: string) => {
  const user = await UserRepository.findByCondition({ email })
  if (!user) throw new Error('user not found')
  user.password = newPassword
  await user.save()
  return user.generateToken()
}

export const UserCommands = {
  registerUser,
  updateUser,
  changePassword
}
