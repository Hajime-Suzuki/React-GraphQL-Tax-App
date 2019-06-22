const RoutesNames = {
  top: '/',
  signup: '/signup',
  login: '/login',
  dashboard: '/dashboard',
  fiscalOverview: (year?: string | number) =>
    year ? `/fiscal-overview/${year}` : '/fiscal-overview/:year',
  projects: '/projects',
  singleProject: (id?: string) => (id ? `/projects/${id}` : '/projects/:id'),
  addProject: '/projects/new',
  editUserProfile: '/user/edit',
  clientsList: '/clients',
  singleClient: (clientId?: string) =>
    clientId ? `/clients/${clientId}` : '/clients/:clientId',

  addClient: '/clients/new',
  userExpenses: '/user-expenses'
}

export { RoutesNames }
