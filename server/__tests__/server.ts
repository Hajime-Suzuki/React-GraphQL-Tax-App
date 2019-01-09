import 'jest'
// import * as supertest from 'supertest'
import app from '../src/app'
import dbConnection from '../src/database/connection'
import { makeExecutableSchema } from 'graphql-tools'
import { graphql } from 'graphql'
import { typeDefs, resolvers } from '../src/server'

export const startServer = async () => {
  const server = app.listen(9000, () => {
    dbConnection
      .then(mg => {
        return mg.connection
      })
      .catch(e => console.log(e))
  })

  return server // return supertest(sv)
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

export const graphqlTestCall = async <Type>(
  query: any,
  variables?: any,
  ctx?: any
) => {
  return graphql<Type>(schema, query, undefined, ctx, variables)
}
