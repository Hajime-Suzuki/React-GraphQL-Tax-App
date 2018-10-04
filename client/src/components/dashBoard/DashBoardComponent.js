import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getEntities } from '../../redux/modules/entities'
import DashBoard from './DashBoard'
import { LoadingIcon } from '../UI/LoadingIcon'

class DashBoardComponent extends Component {
  componentDidMount() {
    this.props.getEntities()
  }
  render() {
    const { projects } = this.props
    if (!projects.size) return <LoadingIcon />
    return <DashBoard projects={projects} />
  }
}

const mapSateToProps = state => ({
  userId: state.user.getId(),
  projects: state.entities.projects.getCurrentPeriodProjects()
})

export default connect(
  mapSateToProps,
  { getEntities }
)(DashBoardComponent)
