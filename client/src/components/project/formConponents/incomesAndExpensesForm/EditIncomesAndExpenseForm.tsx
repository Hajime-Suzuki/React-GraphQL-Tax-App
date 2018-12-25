import * as React from 'react'
import {
  ExpenseAndIncomeInput,
  ProjectInput,
  UpdateIncomesAndExpenses
} from 'src/graphql/components/projects'
import styled from 'styled-components'
import { IncomesAndExpenseFields } from '../../helper/IncomesAndExpenseFields'
import { StyledForm } from '../invoiceForm/InvoiceInfoForm'
import { SingleProjectChildProps } from '../../SingleProjectContainer'
import { Formik, FormikProps } from 'formik'
import EditFormModal from '../../modal/EditFormModal'
import { AddProjectInput } from 'src/graphql/@types/clientTypes'
import { withRouter } from 'react-router'
import { IRouterComponentProps } from 'src/routes/types'

// price from server is String, while price for forms is number.
interface Props {
  incomes?: ExpenseAndIncomeInput[]
  expenses?: ExpenseAndIncomeInput[]
  // handleSubmit: SingleProjectChildProps['handleSubmit']
  selectedModal: SingleProjectChildProps['selectedModal']
  handleCloseModal: SingleProjectChildProps['handleCloseModal']
}

const CustomStyledForm: any = styled(StyledForm)`
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
                    title="Edit Incomes"
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
