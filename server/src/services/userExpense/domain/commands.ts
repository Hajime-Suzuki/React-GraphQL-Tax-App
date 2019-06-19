import { IMutationAddUserExpenseArgs } from '../../@types/types'
import { UserExpenseRepository } from '../repository'

const add = (userId: string, data: IMutationAddUserExpenseArgs['data']) => {
  return UserExpenseRepository.add({
    data,
    userId
  })
}

export const UserExpenseCommands = {
  add
}
