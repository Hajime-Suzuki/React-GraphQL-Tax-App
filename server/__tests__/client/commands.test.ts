import { ClientRepository } from '../../src/services/client/repository'
import { IClient } from '../../src/services/@types/types'
import { ClientCommands } from '../../src/services/client/domain/commands'

const clientBase: IClient = {
  id: '6666',
  firstName: 'asht',
  lastName: 'qdrw',
  email: 'qdrw@puashtn.com',
  projects: []
}

describe('======= Client Commands =======', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  describe('----- updateClientProject -----', () => {
    test('add project id to client', async () => {
      const clientId = '1'
      const projectId = '2'
      const updatedClient = {
        ...clientBase,
        projects: [projectId],
        id: clientId
      }

      const findByProjectId = jest
        .spyOn(ClientRepository, 'findByProjectId')
        .mockResolvedValue(null)

      const pushProjectId = jest
        .spyOn(ClientRepository, 'pushProjectId')
        .mockResolvedValue(updatedClient)

      const popClientId = jest.spyOn(ClientRepository, 'popProjectId')

      const res = ClientCommands.updateClientProject(clientId, projectId)

      expect(findByProjectId).toHaveBeenCalledWith(projectId)
      expect(pushProjectId).toHaveBeenCalledTimes(1)
      expect(pushProjectId).toHaveBeenCalledWith(clientId, projectId)
      expect(popClientId).not.toHaveBeenCalled()

      expect(res).toBeDefined()
      expect(res).toMatchObject(updatedClient)
    })
  })
})
