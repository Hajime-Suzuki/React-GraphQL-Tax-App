import { Document, model, Model, Schema } from 'mongoose'
import * as validator from 'validator'
import { IContactPerson } from '../GraphQL/@types/types'

type ContactPersonDocument = IContactPerson & Document

const contactPersonSchema = new Schema({
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
  link: {
    type: String
  }
})

export const ContactPerson: Model<ContactPersonDocument> = model<
  ContactPersonDocument
>('Contact-Person', contactPersonSchema)
