import { Document, model, Model, Schema, models } from 'mongoose'
import * as validator from 'validator'
import { IClient } from '../@types/types'
import { SchemaDef, Omit } from '../../helpers/types'
import { Constants } from '../../constants'

type IClientDocument = IClient & Document

interface IClientModel extends Model<IClientDocument> {
  findOneOrCreate: (condition: any, data: any) => IClientDocument
}

const schemaDefinition: SchemaDef<Omit<IClient, 'id'>> = {
  firstName: {
    type: String
    // required: true,
    // minlength: [2, 'first name is too short']
  },
  lastName: {
    type: String
    // required: true,
    // minlength: [2, 'last name is too short']
  },
  email: {
    type: String,
    validate: {
      validator(v: string) {
        if (!v) return true
        return validator.isEmail(v)
      },
      message: () => 'invalid email'
    }
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: Constants.documentNames.user
  },
  projects: {
    type: [Schema.Types.ObjectId]
  },
  phone: {
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
  }
}

const clientSchema = new Schema(schemaDefinition)

clientSchema.set('toJSON', {
  virtuals: true
})

const Client: Model<IClientDocument> =
  models.Client ||
  model<IClientDocument, IClientModel>(
    Constants.documentNames.client,
    clientSchema
  )

export { Client }
