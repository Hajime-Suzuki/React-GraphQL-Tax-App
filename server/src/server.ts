import { ApolloServer, makeExecutableSchema, Config } from 'apollo-server-koa'
import { Context } from 'koa'
import { mergeTypes } from 'merge-graphql-schemas'
import { IUser } from './services/@types/types'
import { UserRepository } from './services/user/repository'
import { ProjectRepository } from './services/project/repository'
import { ClientRepository } from './services/client/repository'
import { userSchema } from './services/user/schema'
import { projectSchema } from './services/project/schema'
import { expenseSchema } from './services/expense/schema'
import { clientSchema } from './services/client/schema'
import { userResolvers } from './services/user/resolvers'
import { projectResolvers } from './services/project/resolvers'
import { clientResolvers } from './services/client/resolvers'
import { AuthCheck } from './helpers/auth'
import { invoiceSchema } from './services/invoice/schema'
import { invoiceResolvers } from './services/invoice/resolvers'

export interface IContext {
  userId: string
  token: string
  user: IUser
  dataSources: {
    userRepository: typeof UserRepository;
    projectRepository: typeof ProjectRepository;
    clientRepository: typeof ClientRepository;
  }
}

export const typeDefs = mergeTypes(
  [userSchema, projectSchema, expenseSchema, clientSchema, invoiceSchema],
  {
    all: true
  }
)

export const resolvers = [
  userResolvers,
  projectResolvers,
  clientResolvers,
  invoiceResolvers
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
