import { GeneralExpense } from './model'
import { IGeneralExpenseInput } from '../@types/types'

const findByUserId = async (userId: string) => {
  const generalExp = await GeneralExpense.find({ user: userId })
  return generalExp
}

const add = async ({
  data,
  userId
}: {
  data: IGeneralExpenseInput
  userId: string
}) => {
  const newExp = await GeneralExpense.create({ ...data, user: userId })
  return newExp
}

export const GeneralExpenseRepository = {
  findByUserId,
  add
}
