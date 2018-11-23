import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa'
// import { mergedUserSchema } from './GraphQL/user'
// import { mergedProjectSchema } from './GraphQL/project'
// import { mergedExpenseSchema } from './GraphQL/expense'
// import { mergedContactPersonSchema } from './GraphQL/contactPerson'
import { userSchema } from './GraphQL/user/schema'
import { projectSchema } from './GraphQL/project/schema'
import { expenseSchema } from './GraphQL/expense/schema'
import { contactPersonSchema } from './GraphQL/contactPerson/schema'
import { userResolvers } from './GraphQL/user/resolvers'

const schema = makeExecutableSchema({
  typeDefs: [userSchema, projectSchema, expenseSchema, contactPersonSchema],
  resolvers: [userResolvers]
})

const server = new ApolloServer({ schema })

export default server
