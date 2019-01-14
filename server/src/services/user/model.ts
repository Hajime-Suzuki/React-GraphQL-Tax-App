import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { Document, Model, model, Schema, models } from 'mongoose'
import * as validator from 'validator'
import { secret } from '../../jwt/jwt'
import { SchemaDef, Omit } from '../../helpers/types'
import { IUser } from '../@types/types'

interface IUserMethods {
  generateToken: () => string
  verifyToken: (token: string) => any
  comparePassword: (password: string) => Promise<boolean>
}

export type IUserDocument = IUser &
  Document &
  IUserMethods & { password: string }

interface IUserModel extends Model<IUserDocument> {
  findByToken: (token: string) => IUserDocument
}

const schemaDef: SchemaDef<
  Omit<IUser, 'id'> & { password: any; phone: any }
> = {
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
  projects: [
    {
      type: [Schema.Types.ObjectId],
      ref: 'Project'
    }
  ],
  expenses: [
    {
      type: [Schema.Types.ObjectId],
      ref: 'Expense'
    }
  ],
  btw: {
    type: String
  },
  kvk: {
    type: String
  },
  iban: {
    type: String
  },
  streetAddress: {
    type: String
  },
  postalCode: {
    type: String
  },
  city: {
    type: String
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  updatedAt: {
    type: Date
  },
  clients: {
    type: [Schema.Types.ObjectId],
    ref: 'Client'
  }
}
const userSchema = new Schema(schemaDef)

userSchema.set('toJSON', {
  virtuals: true
})

userSchema.set('toObject', {
  virtuals: true
})

userSchema.methods.generateToken = function() {
  return jwt.sign({ id: this.id }, secret, { expiresIn: '10 days' })
}
userSchema.methods.verifyToken = (token: string): any =>
  jwt.verify(token, secret)

userSchema.methods.comparePassword = async function(plainPassword: string) {
  return bcrypt.compare(plainPassword, this.password)
}

userSchema.statics.findByToken = async function(token: string): Promise<IUser> {
  const verifiedToken: any = jwt.verify(token, secret)
  return this.findById(verifiedToken.id)
}

userSchema.pre<IUserDocument>('save', async function() {
  const user = await User.findOne({ email: this.email })
  if (user) {
    throw new Error('email is already taken')
  }
  if (this.password.length < 6) {
    throw new Error('password is too short')
  }
  this.password = await bcrypt.hash(this.password, 10)
})

const User: IUserModel =
  (models.User as any) || model<IUserDocument, IUserModel>('User', userSchema)

export { User }
