import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { resolvers } from './resolvers'
import typeDefs from './typeDefs'
import { JWT } from 'src/libs/jwt'
import { BASE_URL } from 'src/constants'

const cache = new InMemoryCache()

const httpLink = new HttpLink({
  uri: `${BASE_URL}/graphql`
})

const authLink = setContext((_, { headers }) => {
  const token = JWT.getJwt()
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
  userId: JWT.getUserId()
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
