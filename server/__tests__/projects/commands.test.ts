import { ProjectRepository } from '../../src/services/project/repository'
import { ProjectCommands } from '../../src/services/project/domain/commands'
import {
  IProjectInput,
  IClientInput,
  IProject,
  IClient
} from '../../src/services/@types/types'
import { ProjectManager } from '../../src/services/project/domain/manager'

const user = {
  id: '1234',
  firstName: 'test',
  lastName: 'user',
  email: 'test@test.com'
}

const projectInput: IProjectInput = {
  name: 'test',
  invoiceNumber: '1234',
  incomes: [{ name: 'income1', price: '12.22', quantity: 3, taxRate: 21 }],
  expenses: [{ name: 'expense1', price: '9.97', quantity: 1, taxRate: 6 }],
  invoiceDate: new Date().toDateString(),
  projectDate: new Date().toDateString()
}

const clientInput: IClientInput = {
  firstName: 'asht',
  lastName: 'qdrw',
  email: 'qdrw@puashtn.com'
}

const project: IProject = {
  id: '5555',
  user: user.id,
  ...(projectInput as any)
}

const client: IClient = {
  id: '6666',
  ...(clientInput as any)
}

describe('=========== Project Commands =========', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  describe('-------- add project -------', () => {
    test('can add project without client', async () => {
      const createProject = jest
        .spyOn(ProjectRepository, 'create')
        .mockResolvedValue(project)

      const updateClient = jest.spyOn(ProjectManager, 'updateClientProject')
      const addClient = jest.spyOn(ProjectManager, 'addClient')

      const { savedProject } = await ProjectCommands.addProject(
        user,
        projectInput
      )

      expect(createProject).toHaveBeenCalledWith(user.id, projectInput)
      expect(updateClient).not.toHaveBeenCalled()
      expect(addClient).not.toHaveBeenCalled()
      expect(savedProject).toHaveProperty('id')
      expect(savedProject).toMatchObject(projectInput)
    })

    test('can add project with a new client', async () => {
      const createProject = jest
        .spyOn(ProjectRepository, 'create')
        .mockResolvedValue(project)

      const getClientByCondition = jest
        .spyOn(ProjectManager, 'getClientByCondition')
        .mockResolvedValue(null)

      const updateClientProject = jest.spyOn(
        ProjectManager,
        'updateClientProject'
      )

      const addClient = jest
        .spyOn(ProjectManager, 'addClient')
        .mockResolvedValue(client)

      const {
        savedProject,
        client: savedClient
      } = await ProjectCommands.addProject(user, {
        ...projectInput,
        client: clientInput
      })

      expect(createProject).toHaveBeenCalledWith(user.id, projectInput)
      expect(getClientByCondition).toHaveBeenCalledWith(user.id, clientInput)
      expect(updateClientProject).not.toHaveBeenCalled()
      expect(addClient).toHaveBeenCalledWith(user.id, clientInput)

      expect(savedProject).toHaveProperty('id')
      expect(savedProject).toMatchObject(projectInput)
      expect(savedClient).toHaveProperty('id')
      expect(savedClient).toMatchObject(client)
    })

    test('can add project with an existing client', async () => {
      const createProject = jest
        .spyOn(ProjectRepository, 'create')
        .mockResolvedValue(project)

      const getClientByCondition = jest
        .spyOn(ProjectManager, 'getClientByCondition')
        .mockResolvedValue(client)

      const updateClientProject = jest
        .spyOn(ProjectManager, 'updateClientProject')
        .mockResolvedValue(client)

      const addClient = jest.spyOn(ProjectManager, 'addClient')

      const {
        savedProject,
        client: savedClient
      } = await ProjectCommands.addProject(user, {
        ...projectInput,
        client: clientInput
      })

      expect(createProject).toHaveBeenCalledWith(user.id, projectInput)
      expect(getClientByCondition).toHaveBeenCalledWith(user.id, clientInput)
      expect(updateClientProject).toHaveBeenCalledWith(client.id, project.id)
      expect(addClient).not.toHaveBeenCalled()

      expect(savedProject.id).toBe(project.id)
      expect(savedProject).toMatchObject(projectInput)
      expect(savedClient).toHaveProperty('id')
      expect(savedClient).toMatchObject(client)
    })
  })
})
