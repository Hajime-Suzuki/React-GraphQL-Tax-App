import { User } from './model'
import {
  IMutationRegisterUserArgs,
  IMutationUpdateUserArgs
} from '../@types/types'

const findById = async (id: string | number) => User.findById(id)

const findByCondition = async (
  condition: {
    [key: string]: any
  },
  options?: { password: boolean }
) => {
  if (options && options.password) {
    return User.findOne(condition).select('+password')
  }
  return User.findOne(condition)
}

const findByToken = async (token: string) => User.findByToken(token)

const create = async (data: IMutationRegisterUserArgs) => User.create(data)

const update = async (
  id: string | number,
  data: IMutationUpdateUserArgs['data'],
  option: any = { new: true }
) => User.findOneAndUpdate(id, data, option)

export const UserRepository = {
  findById,
  create,
  findByToken,
  findByCondition,
  update
}
