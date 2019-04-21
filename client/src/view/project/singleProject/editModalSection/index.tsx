import React from 'react'
import EditBasicInfoFormContainer from './basicInfo/EditBasicInfoFormContainer'
import EditExpenseAndIncomeFormContainer from './incomesAndExpeses/EditIncomesAndExpenseFormContainer'
import EditProjectClientFormContainer from './client/EditProjectClientFormContainer'
import { SingleProjectChildProps } from '..'

export const EditModals: React.FunctionComponent<
  SingleProjectChildProps
> = props => {
  const {
    selectedModal,
    project: { incomes, expenses, ...basic },
    client
  } = props

  switch (selectedModal) {
    case 'basic': {
      return <EditBasicInfoFormContainer basic={basic} {...props} />
    }
    case 'client': {
      return <EditProjectClientFormContainer client={client} {...props} />
    }
    case 'incomes': {
      return (
        <EditExpenseAndIncomeFormContainer
          incomes={incomes as any}
          {...props}
        />
      )
    }
    case 'expenses': {
      return (
        <EditExpenseAndIncomeFormContainer
          expenses={expenses as any}
          {...props}
        />
      )
    }
    default:
      return null
  }
}
