import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Document, Model, model, Schema } from 'mongoose'
import * as validator from 'validator'
import { secret } from '../jwt/jwt'

interface IJwt {
  id: string
}

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  password: string
  generateToken: () => string
  verifyToken: (token: string) => any
  comparePassword: (password: string) => Promise<boolean>
}

interface IUserModel extends Model<IUser> {
  findByToken: (token: string) => IUser
}

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [2, 'first name is too short']
  },
  lastName: {
    type: String,
    required: true,
    minlength: [2, 'last name is too short']
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

userSchema.methods.generateToken = function(): string {
  return jwt.sign({ id: this.id }, secret, { expiresIn: '10 days' })
}
userSchema.methods.verifyToken = (token: string): any =>
  jwt.verify(token, secret)

userSchema.methods.comparePassword = async function(
  plainPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, this.password)
}

userSchema.statics.findByToken = async function(token: string): Promise<IUser> {
  const verifiedToken: any = jwt.verify(token, secret)
  return this.findById(verifiedToken.id)
}

const User: IUserModel = model<IUser, IUserModel>('User', userSchema)

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

export { User }
