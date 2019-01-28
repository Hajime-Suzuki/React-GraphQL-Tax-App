import * as React from 'react'
import { SingleProjectChildProps } from '..'
import { Calculations } from '../../helper/calculations'

class TotalAmounts extends React.Component<SingleProjectChildProps> {
  render() {
    const { incomes, expenses } = this.props.project

    const incomesSubtotal = Calculations.getSubtotal(incomes || [])
    const expensesSubtotal = Calculations.getSubtotal(expenses || [])
    return (
      <div>Total: {Number(incomesSubtotal) - Number(expensesSubtotal)}</div>
    )
  }
}

export default TotalAmounts
