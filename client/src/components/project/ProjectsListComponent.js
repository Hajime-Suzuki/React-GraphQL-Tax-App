import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ProjectsList from './ProjectsList'
import { getEntities } from '../../redux/modules/entities'
import { MainWrapper } from '../../styles/sharedStyles'
import Icon from '@material-ui/core/Icon'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

const LoadingIconComponent = styled(Icon)`
  && {
    font-size: 70px;
    color: ${theme.palette.secondary.main};
  }
`

const LoadingIcon = () => {
  return <LoadingIconComponent className="fa fa-spinner fa-spin" />
}

class ProjectsListComponent extends Component {
  componentDidMount() {
    const { projects, getEntities, userId } = this.props
    if (!projects.length || projects.length === 1) getEntities(userId)
  }
  render() {
    // const projects = this.props.projects.getProjects()
    // console.log(projects)
    // return 'projects'

    if (this.props.fetching) return <LoadingIcon />
    return (
      <Fragment>
        <ProjectsList projects={this.props.projects} />
      </Fragment>
    )
  }
}

const mapSateToProps = state => ({
  userId: state.user.userId,
  projects: state.entities.projects.getProjects(),
  fetching: state.entities.projects._status.fetching
})

export default connect(
  mapSateToProps,
  { getEntities }
)(ProjectsListComponent)
