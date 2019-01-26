import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { BASE_URL } from 'src/constants'
import { JWT } from 'src/libs/jwt'
import { resolvers } from './resolvers'
import typeDefs from './typeDefs'

const cache = new InMemoryCache()

const httpLink = new HttpLink({
  uri: `${BASE_URL}/graphql`
})

const authLink = new ApolloLink((operation, forward) => {
  const token = JWT.getJwt()
  operation.setContext((context: any) => ({
    ...context,
    headers: {
      ...context.headers,
      jwt: token || ''
    }
  }))

  return forward!(operation)
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
  link: ApolloLink.from([stateLink, removeTypenameLink, authLink, httpLink])
})

client.onResetStore(async () => stateLink.writeDefaults())
