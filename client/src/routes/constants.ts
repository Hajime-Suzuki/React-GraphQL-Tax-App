const routes = {
  top: '/',
  signup: '/signup',
  login: '/login',
  dashboard: '/dashboard',
  projects: '/projects',
  singleProject: (id?: string) => (id ? `/projects/${id}` : '/projects/:id'),
  addProject: '/projects/new',
  editUserProfile: (userId?: string) =>
    userId ? `/${userId}/edit` : '/:userId/edit'
}

export { routes }
