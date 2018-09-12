import { Document, model, Model, Schema } from 'mongoose'
import { IUser } from './User'

export interface IProject extends Document {
  name: string
  date: Date
  user: IUser
}

const projectSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

export const Project: Model<IProject> = model<IProject>(
  'Project',
  projectSchema
)
