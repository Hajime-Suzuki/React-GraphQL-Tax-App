import { IUser } from '../../@types/types'
import { UserExpenseRepository } from '../repository'

const getExpenses = (userId: IUser['id']) => {
  return UserExpenseRepository.findByUserId(userId)
}

export const UserExpenseQueries = {
  getExpenses
}
