import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import { typeDefs } from '../src/server'
import { graphql } from 'graphql'

export const graphqlTestCallCreator = (mocks?: any) => async <Type>(
  query: any,
  variables?: any,
  ctx?: any
) => {
  const schema = makeExecutableSchema({ typeDefs })
  addMockFunctionsToSchema({ schema, mocks })
  return graphql<Type>(schema, query, undefined, ctx, variables)
}
