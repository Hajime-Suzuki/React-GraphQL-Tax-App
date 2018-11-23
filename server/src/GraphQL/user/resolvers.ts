import { GetUserQueryArgs } from '../@types/types'
import { IResolverObject } from 'graphql-tools'
import { User } from '../../Models/User'
import { Types } from 'mongoose'

export const userResolvers: IResolverObject = {
  Query: {
    async getUser(_, { id }: GetUserQueryArgs) {
      const user = await User.findById({ _id: id }).populate({
        path: 'projects',
        options: { sort: { date: -1 } },
        populate: { path: 'contactPerson' }
      })

      if (!user) throw new Error('user not found')

      return user
    }
  }
}
