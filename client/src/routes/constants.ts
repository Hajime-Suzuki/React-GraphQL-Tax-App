const routes = {
  top: '/',
  signup: '/signup',
  login: '/login',
  dashboard: '/dashboard',
  projects: '/projects',
  singleProject: (id?: string) => (id ? `/projects/${id}` : '/projects/:id'),
  addProject: '/projects/new',
  editUserProfile: '/user/edit',
  clientsList: '/clients',
  singleClient: (clientId?: string) =>
    clientId ? `/clients/${clientId}` : '/clients/:clientId',

  addClient: '/clients/new'
}

export { routes }
