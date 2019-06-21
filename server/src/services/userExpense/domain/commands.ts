import {
  IMutationAddUserExpenseArgs,
  IUpdateUserExpenseInput
} from '../../@types/types'
import { UserExpenseRepository } from '../repository'

const add = (userId: string, data: IMutationAddUserExpenseArgs['data']) => {
  return UserExpenseRepository.add({
    data,
    userId
  })
}

const update = (id: string, data: IUpdateUserExpenseInput) => {
  return UserExpenseRepository.update({ id, data })
}

export const UserExpenseCommands = {
  add,
  update
}
