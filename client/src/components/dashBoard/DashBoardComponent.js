import React, { Component } from 'react'
import DashBoard from './DashBoard'
import { connect } from 'react-redux'
import { getEntities, test } from '../../redux/modules/entities'

class DashBoardComponent extends Component {
  componentDidMount() {
    this.props.getEntities(this.props.userId)
  }
  render() {
    return (
      <div>
        <h1 onClick={this.props.test}>test</h1>
        <DashBoard />
      </div>
    )
  }
}

const mapSateToProps = state => ({
  userId: state.user.getId()
})

export default connect(
  mapSateToProps,
  { getEntities, test }
)(DashBoardComponent)
