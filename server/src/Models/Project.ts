import { Document, model, Model, Schema } from 'mongoose'
import { IProject, IExpenseAndIncome } from '../GraphQL/@types/types'
import { SchemaDef, Omit } from '../helpers/types'

const expenseSchemaDef: SchemaDef<IExpenseAndIncome> = {
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
}
const expenseSchema = new Schema(expenseSchemaDef)

const schemaDef: SchemaDef<Omit<IProject, 'id'> & { createdAt: any }> = {
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
  projectDate: {
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
  // client: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Client'
  // },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  }
}
const projectSchema = new Schema(schemaDef)

projectSchema.set('toJSON', {
  virtuals: true
})

type ProjectDocument = Document & IProject
export const Project: Model<ProjectDocument> = model<ProjectDocument>(
  'Project',
  projectSchema
)
