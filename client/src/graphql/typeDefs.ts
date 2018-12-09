import gql from 'graphql-tag'
// import { mergeTypes } from 'merge-graphql-schemas'

export const typeDefs = gql`
  type Query {
    token: String!
    userId: String
  }
`

export default typeDefs
