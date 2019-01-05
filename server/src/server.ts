import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa'
import { Context } from 'koa'
import { mergeTypes } from 'merge-graphql-schemas'
import { clientResolvers } from './graphql/client/resolvers'
import { clientSchema } from './GraphQL/client/schema'
import { expenseSchema } from './GraphQL/expense/schema'
import { projectResolvers } from './GraphQL/project/resolvers'
import { projectSchema } from './GraphQL/project/schema'
import { sharedTypes } from './GraphQL/shared/sharedTypes'
import { userResolvers } from './GraphQL/user/resolvers'
import { userSchema } from './GraphQL/user/schema'
import { extractIdAndToken } from './helpers/auth'

export interface ICtx {
  userId: string
  token: string
}

const typeDefs = mergeTypes(
  [userSchema, projectSchema, expenseSchema, clientSchema, sharedTypes],
  {
    all: true
  }
)

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers: [userResolvers, projectResolvers, clientResolvers] as any
  }),
  context: async ({ ctx: { headers } }: { ctx: Context }) => {
    if (headers.jwt) {
      return extractIdAndToken(headers)
    }
  }
})

export default server
