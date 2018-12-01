import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getEntities } from '../../redux/modules/entities'
import DashBoard from './DashBoard'
import { LoadingIcon } from '../UI/LoadingIcon'
import Typography from '@material-ui/core/Typography'

class DashBoardComponent extends Component {
  componentDidMount() {
    this.props.getEntities()
  }
  render() {
    const { projects, fetching } = this.props
    console.log(projects)

    if (fetching) return <LoadingIcon />
    if (!projects.size)
      return (
        <Typography variant="display1">You don't have a project yet</Typography>
      )
    return <DashBoard projects={projects} />
  }
}

const mapSateToProps = state => ({
  userId: state.user.getId(),
  projects: state.entities.projects.getCurrentPeriodProjects(),
  fetching: state.entities._status.fetching
})

export default connect(
  mapSateToProps,
  { getEntities }
)(DashBoardComponent)
