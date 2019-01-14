import { Document, model, Model, Schema } from 'mongoose'
import { IExpenseAndIncome } from '../@types/types'

type ExpenseDocument = IExpenseAndIncome & Document

const expenseSchema: Schema = new Schema({
  name: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  taxRate: {
    type: Number
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

export const Expense: Model<ExpenseDocument> = model<ExpenseDocument>(
  'Expense',
  expenseSchema
)
