import {
  IMutationAddUserExpenseArgs,
  IUpdateUserExpenseInput,
  IUserExpense
} from '../../@types/types'
import { UserExpenseRepository } from '../repository'

const add = (userId: string, data: IMutationAddUserExpenseArgs['data']) => {
  return UserExpenseRepository.add({
    data,
    userId
  })
}

const update = (id: IUserExpense['id'], data: IUpdateUserExpenseInput) => {
  return UserExpenseRepository.update({ id, data })
}

const remove = (id: IUserExpense['id']) => {
  return UserExpenseRepository.remove({ id })
}

export const UserExpenseCommands = {
  add,
  update,
  remove
}
