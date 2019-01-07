import 'jest'
// import * as supertest from 'supertest'
import app from '../src/app'
import dbConnection from '../src/database/connection'
import { makeExecutableSchema } from 'graphql-tools'
import { graphql } from 'graphql'
import { typeDefs, resolvers } from '../src/server'

export const startServer = async () => {
  const server = app.listen(9000, () => {
    console.log('test!')
    dbConnection
      .then(mg => {
        console.log('DB')

        return mg.connection
      })
      .catch(e => console.log(e))
  })

  return server // return supertest(sv)
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

export const graphqlTestCall = async (query: any, variables?: any) => {
  return graphql(schema, query, undefined, {}, variables)
}
