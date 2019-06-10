import * as React from 'react'
import { SingleProjectChildProps } from '..'
import { Calculations } from '../../helper/calculations'
import { Currency } from 'src/libs/currency'
import Typography from '@material-ui/core/Typography'

class TotalAmounts extends React.Component<SingleProjectChildProps> {
  render() {
    const { incomes, expenses } = this.props.project
    const incomesSubtotal = Calculations.getGrandTotal(incomes || [], {
      format: false
    })
    const expensesSubtotal = Calculations.getGrandTotal(expenses || [], {
      format: false
    })
    return (
      <Typography variant="h6">
        Gross Total: {Currency.format(+incomesSubtotal - +expensesSubtotal)}
      </Typography>
    )
  }
}

export default TotalAmounts
