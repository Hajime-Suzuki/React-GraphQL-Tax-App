import * as React from 'react'
import { SingleProjectChildProps } from '..'
import { Calculations } from '../../helper/calculations'
import { Currency } from 'src/libs/currency'

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
      <div>
        Gross Total: {Currency.format(+incomesSubtotal - +expensesSubtotal)}
      </div>
    )
  }
}

export default TotalAmounts
