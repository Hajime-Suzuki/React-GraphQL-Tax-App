import { AuthenticationError } from 'apollo-server-core'

export const checkAuth = (userId: string) => {
  if (!userId) throw new AuthenticationError('You are not authorized')
}
