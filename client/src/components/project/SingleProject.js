import React from 'react'

const SingleProject = ({ project }) => {
  if (!project) return null
  return <div>{project.get('name')}</div>
}

export default SingleProject
