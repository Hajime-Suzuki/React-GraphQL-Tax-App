import React, { Component } from 'react'
import DashBoard from './DashBoard'
import { connect } from 'react-redux'
import { getUserData } from '../../redux/modules/data/data'

class DashBoardComponent extends Component {
  componentDidMount() {
    // this.props.getUserData(this.props.userId)
  }
  render() {
    return <DashBoard />
  }
}

const mapSateToProps = state => ({})

export default connect(
  mapSateToProps,
  { getUserData }
)(DashBoardComponent)
