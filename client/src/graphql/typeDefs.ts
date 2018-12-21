import gql from 'graphql-tag'

// gql-gen doesn't infer Project from server, thus this is needed. This is overwritten by Project from server. If you have a property that doesn't exist in Project, it is merged.
const dummyTypes = gql`
  type Project {
    id: String!
  }
`

export const typeDefs = gql`
  ${dummyTypes}
  type Query {
    token: String!
    userId: String
  }
  type Mutation {
    sortProject: Project
  }
`

export default typeDefs
