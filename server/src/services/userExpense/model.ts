import { Document, model, Model, Schema } from 'mongoose'
import { Constants } from '../../constants'
import { IUserExpense } from '../@types/types'

type ExpenseDocument = IUserExpense & Document

const userExpensesSchema = new Schema({
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
  date: {
    type: Date
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: Constants.documentNames.user
  }
})

export const UserExpense: Model<ExpenseDocument> = model<ExpenseDocument>(
  Constants.documentNames.userExpense,
  userExpensesSchema
)
