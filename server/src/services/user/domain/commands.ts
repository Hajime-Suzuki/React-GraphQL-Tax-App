import {
  RegisterUserMutationArgs,
  UpdateUserMutationArgs
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

export const UserCommands = {
  registerUser,
  updateUser
}
