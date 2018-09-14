import { Document, model, Model, Schema } from 'mongoose'
import { IUser } from './User'

export interface IProject extends Document {
  name: string
  date: Date
  taxRate?: [0, 6, 21]
  status?: null | 'invoice sent' | 'paid'
  user?: IUser
  rowPrice: number
  inVoiceDate: number
  referenceNumber: string
  contactPerson: IUser
}

const projectSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  place: {
    type: String
  },
  taxRate: {
    type: Number,
    default: 21
  },
  rowPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: [null, 'invoice sent', 'paid'],
    default: null
  },
  inVoiceDate: {
    type: Date
  },
  referenceNumber: {
    type: String
  },
  contactPerson: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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
