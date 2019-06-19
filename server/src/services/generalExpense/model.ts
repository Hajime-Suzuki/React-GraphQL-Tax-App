import { Document, model, Model, Schema } from 'mongoose'
import { IGeneralExpense } from '../@types/types'
import { Constants } from '../../constants'

type ExpenseDocument = IGeneralExpense & Document

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

export const userExpense: Model<ExpenseDocument> = model<ExpenseDocument>(
  Constants.documentNames.userExpense,
  userExpensesSchema
)
