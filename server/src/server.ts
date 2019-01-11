import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa'
import { Context } from 'koa'
import { mergeTypes } from 'merge-graphql-schemas'
import { IUser } from './GraphQL/@types/types'
import { clientResolvers } from './graphql/client/resolvers'
import { clientSchema } from './GraphQL/client/schema'
import { expenseSchema } from './GraphQL/expense/schema'
import { projectResolvers } from './GraphQL/project/resolvers'
import { projectSchema } from './GraphQL/project/schema'
import { sharedTypes } from './GraphQL/shared/sharedTypes'
import { userResolvers } from './GraphQL/user/resolvers'
import { userSchema } from './GraphQL/user/schema'
import { AuthCheck } from './helpers/auth'

export interface ICtx {
  userId: string
  token: string
  user: IUser
}

export const typeDefs = mergeTypes(
  [userSchema, projectSchema, expenseSchema, clientSchema, sharedTypes],
  {
    all: true
  }
)

export const resolvers = [
  userResolvers,
  projectResolvers,
  clientResolvers
] as any

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers
  }),
  context: async ({ ctx: { headers } }: { ctx: Context }) => {
    if (headers.jwt) {
      return AuthCheck.extractIdAndToken(headers)
    }
  }
})

export default server
