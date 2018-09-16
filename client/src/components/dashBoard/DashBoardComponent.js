import React, { Component } from 'react'
import DashBoard from './DashBoard'
import { connect } from 'react-redux'
import { getEntities } from '../../redux/modules/entities'

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
  { getEntities }
)(DashBoardComponent)
