import { Document, model, Model, Schema } from 'mongoose'
import { IExpenseAndIncome } from './Project'
import { IUser } from './User'

export interface IExpense extends IExpenseAndIncome, Document {
  date: Date
  user: IUser
}

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

export const Expense: Model<IExpense> = model<IExpense>(
  'Expense',
  expenseSchema
)
