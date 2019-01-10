import { User } from '../../Models/User'
import {
  RegisterUserMutationArgs,
  UpdateUserMutationArgs
} from '../@types/types'

const getUserById = async (id: string | number) => User.findById(id)

const getUserByCondition = (condition: { [key: string]: any }) =>
  User.findOne(condition)

const addUser = async (data: RegisterUserMutationArgs) => User.create(data)

const updateUser = async (
  id: string | number,
  data: UpdateUserMutationArgs['data'],
  option: any = { new: true }
) => User.findOneAndUpdate(id, data, option)

export const UserInfra = {
  getUserById,
  addUser,
  getUserByCondition,
  updateUser
}
