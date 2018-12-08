import gql from 'graphql-tag'

const schema = gql`
  type MyType {
    foo: String!
  }

  type Query {
    myType: MyType!
  }
`

export default schema

// const gql = require('graphql-tag')

// const schema = gql`
//   type MyType {
//     foo: String!
//   }

//   type Query {
//     myType: MyType!
//   }
// `

// module.exports = schema
