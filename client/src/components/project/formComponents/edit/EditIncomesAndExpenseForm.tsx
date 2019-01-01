import { Formik, FormikProps } from 'formik'
import * as React from 'react'
import { withRouter } from 'react-router'
import {
  ExpenseAndIncomeInput,
  UpdateIncomesAndExpenses
} from 'src/graphql/components/projects'
import { IRouterComponentProps } from 'src/routes/types'
import styled from 'styled-components'
import { SingleProjectChildProps } from '../../SingleProjectContainer'
import { IncomesAndExpenseFields } from '../IncomesAndExpenseFields'
import EditFormModal from '../modal/EditFormModal'
import { Styles } from 'src/styles/sharedStyles'

interface Props {
  incomes?: ExpenseAndIncomeInput[]
  expenses?: ExpenseAndIncomeInput[]
  selectedModal: SingleProjectChildProps['selectedModal']
  handleCloseModal: SingleProjectChildProps['handleCloseModal']
}

const CustomStyledForm: any = styled(Styles.Form)`
  .form-section {
    margin-bottom: 0;
    padding-bottom: 0;
  }
`

class EditExpenseAndIncomeForm extends React.Component<
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
    const type = !!incomes ? 'incomes' : 'expenses'

    return (
      <UpdateIncomesAndExpenses.Component>
        {(updateProject, { error, loading }) => {
          const initialValues = { incomes, expenses }

          return (
            <Formik
              initialValues={initialValues}
              validateOnChange={false}
              onSubmit={async (values: typeof initialValues) => {
                await updateProject({
                  variables: { data: values, projectId: id }
                })
                handleCloseModal()
              }}
              render={({
                handleChange,
                values,
                handleSubmit
              }: FormikProps<typeof initialValues>) => {
                return (
                  <EditFormModal
                    title={
                      type === 'incomes' ? 'Edit Incomes' : 'Edit Expenses'
                    }
                    isOpen={selectedModal === type}
                    handleCloseModal={handleCloseModal}
                    handleConfirm={handleSubmit}
                    error={
                      error && 'Something went wrong. Please try again later.'
                    }
                    loading={loading}
                  >
                    <CustomStyledForm>
                      <div className="form-section">
                        <IncomesAndExpenseFields
                          type={type}
                          handleChange={handleChange}
                          values={values}
                        />
                      </div>
                    </CustomStyledForm>
                  </EditFormModal>
                )
              }}
            />
          )
        }}
      </UpdateIncomesAndExpenses.Component>
    )
  }
}

export default withRouter(EditExpenseAndIncomeForm)
