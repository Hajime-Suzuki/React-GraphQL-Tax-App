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

// const { makeExecutableSchema } = require('graphql-tools')

// const schema = makeExecutableSchema({
//   typeDefs: `
//         type MyType {
//             foo: String!
//         }

//         type Query {
//             myType: MyType!
//         }
//     `
// })

// module.exports = schema

const gql = require('graphql-tag')

const schema = gql`
  type MyType {
    foo: String!
  }

  type Query {
    myType: MyType!
  }
`

module.exports = { schema }
