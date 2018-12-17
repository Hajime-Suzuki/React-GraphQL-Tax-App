import { Document, model, Model, Schema } from 'mongoose'
import * as validator from 'validator'
import { IClient } from '../GraphQL/@types/types'

type ClientDocument = IClient & Document

const ClientSchema = new Schema({
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
  postalCode: {
    type: String
  }
})

export const Client: Model<ClientDocument> = model<ClientDocument>(
  'Client',
  ClientSchema
)
