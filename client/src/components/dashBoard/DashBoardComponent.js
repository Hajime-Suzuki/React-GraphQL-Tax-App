import React, { Component } from 'react'
import DashBoard from './DashBoard'
import { connect } from 'react-redux'
import { getEntities, test } from '../../redux/modules/entities'
import { usertest } from '../../redux/modules/entities/user'

class DashBoardComponent extends Component {
  componentDidMount() {
    this.props.getEntities(this.props.userId)
  }
  render() {
    return <DashBoard />
  }
}

const mapSateToProps = state => ({
  userId: state.user.getId()
})

export default connect(
  mapSateToProps,
  { getEntities, test, usertest }
)(DashBoardComponent)
