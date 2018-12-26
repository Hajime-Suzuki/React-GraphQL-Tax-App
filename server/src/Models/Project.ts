import { Document, model, Model, Schema } from 'mongoose'
import { IProject } from '../GraphQL/@types/types'

type ProjectDocument = IProject & Document

const expenseSchema: Schema = new Schema({
  name: {
    type: String
  },
  price: {
    type: Number
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
    default: 'none'
  },
  expenses: [expenseSchema],
  incomes: [expenseSchema],
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

projectSchema.set('toJSON', {
  virtuals: true
})

export const Project: Model<ProjectDocument> = model<ProjectDocument>(
  'Project',
  projectSchema
)
