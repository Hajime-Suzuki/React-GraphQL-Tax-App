const routes = {
  top: '/',
  signup: '/signup',
  login: '/login',
  dashboard: '/dashboard',
  projects: '/projects',
  singleProject: id => (id ? `/projects/${id}` : '/projects/:id'),
  addProject: '/projects/new'
}

export { routes }
