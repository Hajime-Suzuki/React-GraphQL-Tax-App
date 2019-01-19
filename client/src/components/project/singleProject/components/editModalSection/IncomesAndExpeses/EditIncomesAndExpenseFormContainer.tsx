import { ApolloError } from 'apollo-client'
import { Formik, FormikProps } from 'formik'
import * as React from 'react'
import { withRouter } from 'react-router'
import {
  ExpenseAndIncomeInput,
  UpdateIncomesAndExpenses
} from 'src/graphql/components/projects'
import { IRouterComponentProps } from 'src/routes/types'
import { SingleProjectChildProps } from '../../..'
import EditExpenseAndIncomeForm from './EditIncomesAndExpenseForm'

export type EditExpenseAndIncomesChildProps = {
  type: 'incomes' | 'expenses';
  selectedModal?: Props['selectedModal'];
  values: FormValues;
  error?: ApolloError;
  loading: boolean;
  handleCloseModal: Props['handleCloseModal'];
} & FormikProps<FormValues>

interface Props {
  incomes?: ExpenseAndIncomeInput[]
  expenses?: ExpenseAndIncomeInput[]
  selectedModal?: SingleProjectChildProps['selectedModal']
  handleCloseModal: SingleProjectChildProps['handleCloseModal']
}

type FormValues = Pick<Props, 'incomes' | 'expenses'>

class EditExpenseAndIncomeFormContainer extends React.Component<
  Props & IRouterComponentProps
> {
  render() {
    const {
      incomes,
      expenses,
      selectedModal,
      handleCloseModal,
      match: {
        params: { id }
      }
    } = this.props

    if (!incomes && !expenses) return null

    return (
      <UpdateIncomesAndExpenses.Component>
        {(updateProject, { error, loading }) => {
          return (
            <Formik
              initialValues={{ incomes, expenses }}
              validateOnChange={false}
              onSubmit={async (values: FormValues) => {
                await updateProject({
                  variables: { data: values, projectId: id }
                })
                handleCloseModal()
              }}
              render={(formProps: FormikProps<FormValues>) => {
                return (
                  <EditExpenseAndIncomeForm
                    type={!!incomes ? 'incomes' : 'expenses'}
                    selectedModal={selectedModal}
                    error={error}
                    loading={loading}
                    handleCloseModal={handleCloseModal}
                    {...formProps}
                  />
                )
              }}
            />
          )
        }}
      </UpdateIncomesAndExpenses.Component>
    )
  }
}

export default withRouter(EditExpenseAndIncomeFormContainer)
