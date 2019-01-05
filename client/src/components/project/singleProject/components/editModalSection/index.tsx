import { SingleProjectChildProps } from '../..'
import React from 'react'
import EditExpenseAndIncomeForm from './EditIncomesAndExpenseForm'
import EditBasicInfoFormAndClient from './EditBasicInfoFormAndClient'

export const EditModals: React.SFC<SingleProjectChildProps> = props => {
  const {
    selectedModal,
    project: { client, incomes, expenses, ...basic }
  } = props
  return (
    <React.Fragment>
      {selectedModal === 'incomes' && (
        <EditExpenseAndIncomeForm incomes={incomes as any} {...props} />
      )}
      {selectedModal === 'expenses' && (
        <EditExpenseAndIncomeForm expenses={expenses as any} {...props} />
      )}
      {selectedModal === 'basic' && (
        <EditBasicInfoFormAndClient basic={basic} client={client} {...props} />
      )}
    </React.Fragment>
  )
}
