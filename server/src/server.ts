import { ApolloServer } from 'apollo-server-koa'
import { Context } from 'koa'
import { mergeTypes } from 'merge-graphql-schemas'
import { contactPersonSchema } from './GraphQL/contactPerson/schema'
import { expenseSchema } from './GraphQL/expense/schema'
import { projectResolvers } from './GraphQL/project/resolvers'
import { projectSchema } from './GraphQL/project/schema'
import { sharedTypes } from './GraphQL/shared/sharedTypes'
import { userResolvers } from './GraphQL/user/resolvers'
import { userSchema } from './GraphQL/user/schema'
import { User } from './Models/User'

export interface ICtx {
  userId: string
}

const mergedTypes = mergeTypes(
  [userSchema, projectSchema, expenseSchema, contactPersonSchema, sharedTypes],
  {
    all: true
  }
)

const server = new ApolloServer({
  typeDefs: mergedTypes,
  resolvers: [userResolvers, projectResolvers],
  context: async ({ ctx: { headers } }: { ctx: Context }) => {
    if (headers.jwt) {
      const user = await User.findByToken(headers.jwt)
      return {
        userId: user.id
      }
    }
  }
})

export default server
