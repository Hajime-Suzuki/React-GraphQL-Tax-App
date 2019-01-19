import React from 'react'
import { SingleProjectChildProps } from '../..'
import EditBasicInfoFormContainer from './basicInfo/EditBasicInfoFormContainer'
import EditExpenseAndIncomeFormContainer from './incomesAndExpeses/EditIncomesAndExpenseFormContainer'

export const EditModals: React.SFC<SingleProjectChildProps> = props => {
  const {
    selectedModal,
    project: { incomes, expenses, ...basic },
    client
  } = props

  return (
    <React.Fragment>
      {selectedModal === 'basic' && (
        <EditBasicInfoFormContainer basic={basic} {...props} />
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
