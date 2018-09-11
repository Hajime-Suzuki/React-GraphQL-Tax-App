import * as bcrypt from 'bcrypt'
import { Document, Model, model, Schema } from 'mongoose'

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  password: string
}

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: [2, 'first name is too short']
  },
  lastName: {
    type: String,
    required: true,
    min: [2, 'last name is too short']
  },
  email: {
    type: String,
    required: [true, 'email is required']
  },
  password: {
    type: String,
    required: true,
    min: [6, 'password is too short'],
    select: false
  }
})

export const User: Model<IUser> = model<IUser>('users', userSchema)

userSchema.pre<IUser>('save', async function() {
  const user = await User.findOne({ email: this.email })
  if (user) {
    throw new Error('email is already taken')
  }
  this.password = await bcrypt.hash(this.password, 10)
})
