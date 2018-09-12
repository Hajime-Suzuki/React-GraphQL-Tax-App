import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Document, Model, model, Schema } from 'mongoose'
import * as validator from 'validator'
import { salt } from '../jwt/jwt'

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
    required: [true, 'email is required'],
    validate: {
      validator(v: string) {
        return validator.isEmail(v)
      },
      message: () => 'invalid email'
    }
  },
  phone: {
    type: String
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const User: Model<IUser> = model<IUser>('User', userSchema)

userSchema.pre<IUser>('save', async function() {
  const user = await User.findOne({ email: this.email })
  if (user) {
    throw new Error('email is already taken')
  }
  if (this.password.length < 6) {
    throw new Error('password is too short')
  }
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.generateToken = function(): string {
  return jwt.sign(this.id, salt)
}

userSchema.methods.verifyToken = (token: string): object | string =>
  jwt.verify(token, salt)
