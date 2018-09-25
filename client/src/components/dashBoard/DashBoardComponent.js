import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getEntities } from '../../redux/modules/entities'
import DashBoard from './DashBoard'

class DashBoardComponent extends Component {
  componentDidMount() {
    this.props.getEntities()
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
