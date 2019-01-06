import React from 'react'
import { SingleProjectChildProps } from '../..'
import EditBasicInfoFormAndClient from './EditBasicInfoAndClientForm'
import EditExpenseAndIncomeForm from './EditIncomesAndExpenseForm'

export const EditModals: React.SFC<SingleProjectChildProps> = props => {
  const {
    selectedModal,
    project: { incomes, expenses, ...basic }
  } = props

  return (
    <React.Fragment>
      {selectedModal === 'basic' && (
        <EditBasicInfoFormAndClient basic={basic} {...props} />
      )}
      {selectedModal === 'incomes' && (
        <EditExpenseAndIncomeForm incomes={incomes as any} {...props} />
      )}
      {selectedModal === 'expenses' && (
        <EditExpenseAndIncomeForm expenses={expenses as any} {...props} />
      )}
    </React.Fragment>
  )
}
