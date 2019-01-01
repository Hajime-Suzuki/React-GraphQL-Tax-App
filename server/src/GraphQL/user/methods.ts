import { User } from '../../Models/User'
import {
  LoginUserMutationArgs,
  RegisterUserMutationArgs,
  UpdateUserMutationArgs
} from '../@types/types'

export const getUserById = async (id: string) => {
  const user = await User.findById(id)
  if (!user) throw new Error('user not found')
  return user
}
export const registerUser = async (data: RegisterUserMutationArgs) => {
  try {
    const newUser = await new User(data).save()
    return newUser.generateToken()
  } catch (e) {
    throw new Error(e)
  }
}
export const loginUser = async ({ email, password }: LoginUserMutationArgs) => {
  try {
    const user = await User.findOne({ email }).select('+password')
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
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true
    })
    if (!updatedUser) throw new Error('can not update user')
    return updatedUser
  } catch (e) {
    throw new Error(e)
  }
}
