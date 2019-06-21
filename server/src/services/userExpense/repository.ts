import { UserExpense } from './model'
import {
  IUserExpenseInput,
  IUpdateUserExpenseInput,
  IUserExpense
} from '../@types/types'

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

const update = async ({
  id,
  data
}: {
  id: IUserExpense['id']
  data: IUpdateUserExpenseInput
}) => {
  const updated = await UserExpense.findOneAndUpdate(id, data, { new: true })
  if (!updated) throw new Error('item not found')

  return updated
}

const remove = async ({ id }: { id: IUserExpense['id'] }) => {
  const expense = await UserExpense.findById(id)
  if (!expense) throw new Error('item not found')
  return expense.remove()
}

export const UserExpenseRepository = {
  findByUserId,
  add,
  update,
  remove
}
