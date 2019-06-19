import { UserExpense } from './model'
import { IUserExpenseInput } from '../@types/types'

const findByUserId = async (userId: string) => {
  const userExp = await UserExpense.find({ user: userId })
  return userExp
}

const add = async ({
  data,
  userId
}: {
  data: IUserExpenseInput
  userId: string
}) => {
  const newExp = await UserExpense.create({ ...data, user: userId })
  return newExp
}

export const UserExpenseRepository = {
  findByUserId,
  add
}
