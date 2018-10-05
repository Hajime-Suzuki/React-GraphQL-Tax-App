import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import React, { Fragment } from 'react'
import styled from 'styled-components'
import TotalPrices from './incomesAndExpenses/TotalPrices'

const Wrapper = styled.div`
  .income-tax-table {
    width: 50%;
  }
`

const DashBoard = props => {
  const { projects } = props
  return (
    <Fragment>
      <Wrapper>
        <Typography variant="display1">Current Period</Typography>
        <Paper className="income-tax-table">
          <TotalPrices projects={projects} />
        </Paper>
      </Wrapper>
    </Fragment>
  )
}
export default DashBoard
