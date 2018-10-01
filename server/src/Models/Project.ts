import { Document, model, Model, Schema } from 'mongoose'
import { IContactPerson } from './ContactPerson'
import { IUser } from './User'

export interface IExpenseAndIncome {
  name: string
  price: number
  quantity: number
  taxRate: 0 | 6 | 21
}

export interface IProject extends Document {
  invoiceNumber: string
  inVoiceDate?: Date
  name: string
  date?: Date
  streetAddress?: string
  city?: string
  link?: string
  status?: 'none' | 'invoice' | 'paid'
  contactPerson?: IContactPerson
  user: IUser
  expenses: [IExpenseAndIncome]
  incomes: [IExpenseAndIncome]
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
  }
})

const projectSchema: Schema = new Schema({
  invoiceNumber: {
    type: String,
    required: true
  },
  invoiceDate: {
    type: Date
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  streetAddress: {
    type: String
  },
  city: {
    type: String
  },
  link: {
    type: String
  },
  status: {
    type: String,
    enum: ['none', 'invoice', 'paid'],
    default: null
  },
  expenses: [expenseSchema],
  incomes: [expenseSchema],
  contactPerson: {
    type: Schema.Types.ObjectId,
    ref: 'Contact-Person'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

projectSchema.set('toJSON', {
  virtuals: true
})

export const Project: Model<IProject> = model<IProject>(
  'Project',
  projectSchema
)
