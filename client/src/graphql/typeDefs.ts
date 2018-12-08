import gql from 'graphql-tag'
// import { mergeTypes } from 'merge-graphql-schemas'

export const typeDefs = gql`
  type Query {
    token: String!
    userId: String
  }
  type Mutation {
    logout: String
  }
`

export default typeDefs
