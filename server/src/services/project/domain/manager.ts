import { ClientQueries } from '../../client/domain/queries'

const getClientByUser = (userId: string) => {
  ClientQueries.get
}
const updateClientProject = (clientId: string, projectId: string) => {}

export const ProjectManager = {
  getClientByUser,
  updateClientProject
}
