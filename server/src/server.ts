import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa'
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

const typeDefs = mergeTypes(
  [userSchema, projectSchema, expenseSchema, contactPersonSchema, sharedTypes],
  {
    all: true
  }
)

// const myCustomScalarType = new GraphQLScalarType({
//   name: 'MyCustomScalar',
//   description: 'Description of my custom scalar type',
//   serialize() {
//     // Implement your own behavior here by setting the 'result' variable
//     return 'asht'
//   },
//   parseValue() {
//     // Implement your own behavior here by setting the 'result' variable
//     return 'qdrw'
//   },
//   parseLiteral(ast) {
//     return 'zvmc'
//   }
// })

// const schemaString = `

// scalar MyCustomScalar

// type Foo {
//   aField: MyCustomScalar
// }

// type Query {
//   foo: Foo
// }

// `
// const resolverFunctions = {
//   MyCustomScalar: myCustomScalarType
// }
// console.log(typeDefs + 'scalar Test')
// console.log({
//   ...userResolvers,
//   ...projectResolvers,
//   test: customScalar
// })
// console.log(
//   makeExecutableSchema({
//     typeDefs,
//     resolvers: [userResolvers, projectResolvers, customScalar]
//   })
// )
const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers: [userResolvers, projectResolvers]
  }),
  // schema: makeExecutableSchema({
  //   typeDefs: schemaString,
  //   resolvers: resolverFunctions
  // }),
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
