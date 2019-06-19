import { userExpense } from './model'
import { IGeneralExpenseInput } from '../@types/types'

const findByUserId = async (userId: string) => {
  const generalExp = await userExpense.find({ user: userId })
  return generalExp
}

const add = async ({
  data,
  userId
}: {
  data: IGeneralExpenseInput
  userId: string
}) => {
  const newExp = await userExpense.create({ ...data, user: userId })
  return newExp
}

export const GeneralExpenseRepository = {
  findByUserId,
  add
}
