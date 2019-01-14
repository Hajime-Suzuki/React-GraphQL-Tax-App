import { ApolloServer, makeExecutableSchema, Config } from 'apollo-server-koa'
import { Context } from 'koa'
import { mergeTypes } from 'merge-graphql-schemas'
import { AuthCheck } from './helpers/auth'
import { IUser } from './contexts/@types/types'
import { userSchema } from './contexts/user/schema'
import { projectSchema } from './contexts/project/schema'
import { expenseSchema } from './contexts/expense/schema'
import { clientSchema } from './contexts/client/schema'
import { userResolvers } from './contexts/user/resolvers'
import { projectResolvers } from './contexts/project/resolvers'
import { clientResolvers } from './contexts/client/resolvers'
import { UserRepository } from './contexts/user/repository'
import { DataSource } from 'apollo-datasource'
import { ProjectRepository } from './contexts/project/repository'
import { ClientRepository } from './contexts/client/repository'

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
  [userSchema, projectSchema, expenseSchema, clientSchema],
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
