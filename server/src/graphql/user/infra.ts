import {
  RegisterUserMutationArgs,
  UpdateUserMutationArgs
} from '../@types/types'
import { User } from './User'

const getUserById = async (id: string | number) => User.findById(id)

const getUserByCondition = async (
  condition: {
    [key: string]: any
  },
  options?: { password: boolean }
) => {
  if (options && options.password) User.findOne(condition).select('+password')
  return User.findOne(condition)
}

const getUserByToken = async (token: string) => User.findByToken(token)

const addUser = async (data: RegisterUserMutationArgs) => User.create(data)

const updateUser = async (
  id: string | number,
  data: UpdateUserMutationArgs['data'],
  option: any = { new: true }
) => User.findOneAndUpdate(id, data, option)

export const UserInfra = {
  getUserById,
  addUser,
  getUserByToken,
  getUserByCondition,
  updateUser
}
