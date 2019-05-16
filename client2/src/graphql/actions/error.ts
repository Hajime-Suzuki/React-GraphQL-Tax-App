import { client } from '../client'

const setEditError = (message: string) => {
  client.writeData({ data: { editProjectMutationError: message } })
}
const resetEditError = () => {
  client.writeData({ data: { editProjectMutationError: 'null' } })
}

export const ErrorActions = {
  setEditError,
  resetEditError
}
