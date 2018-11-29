import { User } from '../../Models/User'
import {
  LoginUserMutationArgs,
  RegisterUserMutationArgs
} from '../@types/types'

export const getUserById = async (id: string) => User.findById(id)
export const registerUser = async (data: RegisterUserMutationArgs) => {
  try {
    const newUser = await new User(data).save()
    return {
      success: true,
      message: 'user is created',
      token: newUser.generateToken()
    }
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
    return {
      success: true,
      token: user.generateToken()
    }
  } catch (e) {
    throw new Error(e)
  }
}
