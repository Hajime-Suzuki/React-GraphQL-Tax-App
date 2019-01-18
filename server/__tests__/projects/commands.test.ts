import { ProjectRepository } from '../../src/services/project/repository'
import { ProjectCommands } from '../../src/services/project/domain/commands'
import { IProjectInput } from '../../src/services/@types/types'
import { ProjectManager } from '../../src/services/project/domain/manager'

const user = {
  id: '1234',
  firstName: 'test',
  lastName: 'user',
  email: 'test@test.com'
}
describe('=========== Project Commands =========', () => {
  describe('-------- add project -------', () => {
    const projectInput: IProjectInput = {
      name: 'test',
      invoiceNumber: '1234',
      incomes: [{ name: 'income1', price: '12.22', quantity: 3, taxRate: 21 }],
      expenses: [{ name: 'expense1', price: '9.97', quantity: 1, taxRate: 6 }],
      invoiceDate: new Date().toDateString(),
      projectDate: new Date().toDateString()
    }

    test('can add project without client', async () => {
      const createProject = jest
        .spyOn(ProjectRepository, 'create')
        .mockResolvedValue({ ...projectInput, id: '9999' })
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
  })
})
