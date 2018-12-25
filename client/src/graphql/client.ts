import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, Operation } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { getJwt, USER_ID } from 'src/libs/jwt'
import { resolvers } from './resolvers'
import typeDefs from './typeDefs'

const cache = new InMemoryCache()

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = getJwt()
  return {
    headers: {
      ...headers,
      jwt: token || ''
    }
  }
})

const removeTypenameLink = new ApolloLink((operation, forward) => {
  if (Object.keys(operation.variables).length) {
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      (key, value) => (key === '__typename' ? undefined : value)
    )
  }

  return forward!(operation)
})

export const defaults = {
  userId: USER_ID || null,
  editProjectMutationError: null
}

const stateLink = withClientState({
  cache,
  typeDefs,
  resolvers,
  defaults
})

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([authLink, stateLink, removeTypenameLink, httpLink])
})

client.onResetStore(async () => stateLink.writeDefaults())
