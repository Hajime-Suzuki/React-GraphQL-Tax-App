import { AuthCheck } from '../../helpers/auth'
import {
  IUpdateUserInput,
  IUser,
  LoginUserMutationArgs,
  RegisterUserMutationArgs
} from '../@types/types'
import { UserDomain } from './domain'

const getUser = (user: IUser) => {
  AuthCheck.userExist(user)
  return user
}

const registerUser = async (data: RegisterUserMutationArgs) => {
  // validation
  const token = await UserDomain.registerUser(data)
  return token
}

const loginUser = async (data: LoginUserMutationArgs) => {
  // validation
  return await UserDomain.loginUser(data)
}

const updateUser = async (userId: string, data: IUpdateUserInput) => {
  // validation
  return UserDomain.updateUser(userId, data)
}

export const UserActions = {
  getUser,
  registerUser,
  loginUser,
  updateUser
}
