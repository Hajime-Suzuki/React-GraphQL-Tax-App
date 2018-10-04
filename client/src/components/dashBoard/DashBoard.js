import Typography from '@material-ui/core/Typography'
import React, { Fragment } from 'react'
import {
  calculateCurrentPeriodRawPrice,
  calculateCurrentPeriodTax
} from './libs/calculatePriceAndTax'

const DashBoard = props => {
  const { projects } = props
  return (
    <Fragment>
      <Typography variant="display1">Current Period</Typography>
      <Typography>
        Gross Income: {calculateCurrentPeriodRawPrice(projects)}
      </Typography>
      <Typography>Tax: {calculateCurrentPeriodTax(projects)}</Typography>
    </Fragment>
  )
}
export default DashBoard
