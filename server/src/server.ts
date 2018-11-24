import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa'
import { Context } from 'koa'
import { contactPersonSchema } from './GraphQL/contactPerson/schema'
import { expenseSchema } from './GraphQL/expense/schema'
import { projectSchema } from './GraphQL/project/schema'
import { sharedTypes } from './GraphQL/shared/sharedTypes'
import { userResolvers } from './GraphQL/user/resolvers'
// import { mergedUserSchema } from './GraphQL/user'
// import { mergedProjectSchema } from './GraphQL/project'
// import { mergedExpenseSchema } from './GraphQL/expense'
// import { mergedContactPersonSchema } from './GraphQL/contactPerson'
import { userSchema } from './GraphQL/user/schema'
import { User } from './Models/User'

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [
      userSchema,
      projectSchema,
      expenseSchema,
      contactPersonSchema,
      sharedTypes
    ],
    resolvers: [userResolvers]
  }),
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
