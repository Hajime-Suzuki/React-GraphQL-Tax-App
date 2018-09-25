import { Document, model, Model, Schema } from 'mongoose'
import { IContactPerson } from './ContactPerson'
import { IUser } from './User'

export interface IExpense {
  name: string
  price: number
  taxRate: number
}

export interface IProject extends Document {
  invoiceNumber: string
  inVoiceDate?: Date
  name: string
  rowPrice: number
  date?: Date
  streetAddress?: string
  city?: string
  taxRate: [0, 6, 21]
  link?: string
  status?: 'none' | 'invoice' | 'paid'
  contactPerson?: IContactPerson
  user: IUser
  expenses: [IExpense]
  incomes: [IExpense]
}

const expenseSchema: Schema = new Schema({
  name: {
    type: String
  },
  price: {
    type: Number
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
  rowPrice: {
    // need validation. 0 || 6 || 21
    type: Number,
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
  taxRate: {
    type: Number,
    default: 21
  },
  link: {
    type: String
  },
  status: {
    type: String,
    enum: ['none', 'invoice', 'paid'],
    default: null
  },
  // expenses: ,
  contactPerson: {
    type: Schema.Types.ObjectId,
    ref: 'Contact-Person'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  expenses: [expenseSchema],
  incomes: [expenseSchema]
})

projectSchema.set('toJSON', {
  virtuals: true
})

export const Project: Model<IProject> = model<IProject>(
  'Project',
  projectSchema
)
