import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { getJwt, USER_ID } from 'src/libs/jwt'
import { resolvers } from './resolvers'
import typeDefs from './typeDefs'

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

export const defaults = {
  userId: USER_ID || null
}

const cache = new InMemoryCache()
const stateLink = withClientState({
  cache,
  typeDefs,
  resolvers,
  defaults
})

const link = ApolloLink.from([authLink, stateLink, httpLink])

export const client = new ApolloClient({
  cache,
  link
})

client.onResetStore(async () => stateLink.writeDefaults())
