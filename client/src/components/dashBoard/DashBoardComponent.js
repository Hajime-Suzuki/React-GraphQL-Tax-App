import React, { Component } from 'react'
import DashBoard from './DashBoard'
import { connect } from 'react-redux'
import { getUserData } from '../../redux/modules/data/data'

class DashBoardComponent extends Component {
  componentDidMount() {
    this.props.getUserData(this.props.userId)
  }
  render() {
    return <DashBoard projects={this.props.projects} />
  }
}

const mapSateToProps = state => ({
  userId: state.userId,
  projects: Object.values(state.data.projects)
})

export default connect(
  mapSateToProps,
  { getUserData }
)(DashBoardComponent)
