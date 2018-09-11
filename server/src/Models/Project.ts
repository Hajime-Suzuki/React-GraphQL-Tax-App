import { Document, model, Model, Schema } from 'mongoose'

export interface IProject extends Document {
  name: string
  date: Date
}

const projectSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date
  }
})

export const Project: Model<IProject> = model<IProject>(
  'projects',
  projectSchema
)
