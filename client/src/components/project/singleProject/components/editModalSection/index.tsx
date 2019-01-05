import React from 'react'
import { SingleProjectChildProps } from '../..'
import EditBasicInfoFormAndClient from './EditBasicInfoAndClientForm'
import EditExpenseAndIncomeForm from './EditIncomesAndExpenseForm'

export const EditModals: React.SFC<SingleProjectChildProps> = props => {
  const {
    selectedModal,
    project: { client, incomes, expenses, ...basic }
  } = props
  const { id, ...clientInfo } = client || { id: null }

  return (
    <React.Fragment>
      {selectedModal === 'basic' && (
        <EditBasicInfoFormAndClient
          basic={basic}
          client={clientInfo}
          {...props}
        />
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
