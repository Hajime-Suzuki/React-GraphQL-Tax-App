import React from 'react'
import PrivateRoutes from '../PrivateRoutes'
import { RoutesNames } from '../route-names'
import ProjectsListContainer from 'src/view/project/projectLists'
import AddProjectContainer from 'src/view/project/addProject'
import SingleProjectContainer from 'src/view/project/singleProject'

const ProjectRoutes = () => {
  return (
    <>
      <PrivateRoutes
        path={RoutesNames.projects}
        exact
        component={ProjectsListContainer}
      />
      <PrivateRoutes
        path={RoutesNames.addProject}
        exact
        component={AddProjectContainer}
      />
      <PrivateRoutes
        path={RoutesNames.singleProject()}
        exact
        component={SingleProjectContainer}
      />
    </>
  )
}

export default ProjectRoutes
