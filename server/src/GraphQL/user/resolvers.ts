import { GetUserQueryArgs } from '../@types/types'
import { IResolverObject } from 'graphql-tools'
import { User, IUser } from '../../Models/User'
import { Types } from 'mongoose'
import { Context } from 'koa'
import { AuthenticationError } from 'apollo-server-koa'

interface ICtx {
  userId: string
}

export const userResolvers: IResolverObject = {
  Query: {
    async getUser(_, { id }: GetUserQueryArgs, { userId }: ICtx) {
      if (!userId) throw new AuthenticationError('You are not authorized')
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
