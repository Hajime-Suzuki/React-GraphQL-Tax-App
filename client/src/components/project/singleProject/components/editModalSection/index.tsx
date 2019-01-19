import React from 'react'
import { SingleProjectChildProps } from '../..'
import EditBasicInfoFormAndClient from './EditBasicInfoAndClientForm'
import EditExpenseAndIncomeFormContainer from './IncomesAndExpeses/EditIncomesAndExpenseFormContainer'

export const EditModals: React.SFC<SingleProjectChildProps> = props => {
  const {
    selectedModal,
    project: { incomes, expenses, ...basic },
    client
  } = props

  return (
    <React.Fragment>
      {selectedModal === 'basic' && (
        <EditBasicInfoFormAndClient basic={basic} client={client} {...props} />
      )}
      {selectedModal === 'incomes' && (
        <EditExpenseAndIncomeFormContainer
          incomes={incomes as any}
          {...props}
        />
      )}
      {selectedModal === 'expenses' && (
        <EditExpenseAndIncomeFormContainer
          expenses={expenses as any}
          {...props}
        />
      )}
    </React.Fragment>
  )
}
