import { Document, model, Model, Schema } from 'mongoose'
import { IGeneralExpense } from '../@types/types'

type ExpenseDocument = IGeneralExpense & Document

const generalExpenseSchema = new Schema({
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
    ref: 'User'
  }
})

export const GeneralExpense: Model<ExpenseDocument> = model<ExpenseDocument>(
  'GeneralExpense',
  generalExpenseSchema
)
