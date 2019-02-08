import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-koa'
import { Context } from 'koa'
import { mergeTypes } from 'merge-graphql-schemas'
import { AuthCheck } from './helpers/auth'
import { IUser } from './services/@types/types'
import { ClientRepository } from './services/client/repository'
import { clientResolvers } from './services/client/resolvers'
import { clientSchema } from './services/client/schema'
import { invoiceResolvers } from './services/invoice/resolvers'
import { invoiceSchema } from './services/invoice/schema'
import { ProjectRepository } from './services/project/repository'
import { projectResolvers } from './services/project/resolvers'
import { projectSchema } from './services/project/schema'
import { UserRepository } from './services/user/repository'
import { userResolvers } from './services/user/resolvers'
import { userSchema } from './services/user/schema'
import { expenseSchema } from './services/generalExpense/schema'

const health = gql`
  type Query {
    health: String
  }
`
const healthRes = {
  Query: { health: () => 'OK!' }
}

export interface IContext {
  userId: string
  token: string
  user: IUser
  dataSources: {
    userRepository: typeof UserRepository
    projectRepository: typeof ProjectRepository
    clientRepository: typeof ClientRepository
  }
}

export const typeDefs = mergeTypes(
  [
    userSchema,
    projectSchema,
    expenseSchema,
    clientSchema,
    invoiceSchema,
    health
  ],
  {
    all: true
  }
)

export const resolvers = [
  userResolvers,
  projectResolvers,
  clientResolvers,
  invoiceResolvers,
  healthRes
] as any

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers
  }),
  dataSources: () =>
    ({
      userRepository: UserRepository,
      projectRepository: ProjectRepository,
      clientRepository: ClientRepository
    } as any),
  context: async ({ ctx: { headers } }: { ctx: Context }) => {
    if (headers.jwt) {
      return AuthCheck.extractIdAndToken(headers)
    }
  }
})

export default server
