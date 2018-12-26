import { Document, model, Model, Schema } from 'mongoose'
import * as validator from 'validator'
import { IClient } from '../GraphQL/@types/types'

type IClientDocument = IClient & Document

interface IClientModel extends Model<IClientDocument> {
  findOneOrCreate: (condition: any, data: any) => IClientDocument
}

const clientSchema = new Schema({
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
    ref: 'User'
  },
  projects: {
    type: [Schema.Types.ObjectId]
  },
  phone: {
    type: String
  },
  postalCode: {
    type: String
  },
  address: {
    type: String
  }
})

clientSchema.set('toJSON', {
  virtuals: true
})

clientSchema.statics.findOneAndUpdateOrCreate = async function(
  condition: any,
  data: any
): Promise<IClient> {
  const existingClient = await this.findOne({ ...condition })
  console.log({ existingClient })
  if (!existingClient) {
    const newClient = await Client.create(data)
    console.log({ newClient })
    return newClient
  } else {
    return await existingClient.update(data)
  }
}

export const Client = model<IClientDocument, IClientModel>(
  'Client',
  clientSchema
)
