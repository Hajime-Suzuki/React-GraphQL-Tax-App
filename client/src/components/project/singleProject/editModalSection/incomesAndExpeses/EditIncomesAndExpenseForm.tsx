import * as React from 'react'
import { Styles } from 'src/styles/sharedStyles'
import styled from 'styled-components'

import { EditExpenseAndIncomesChildProps } from './EditIncomesAndExpenseFormContainer'
import EditFormModal from 'src/libs/forms/EditFormModal'
import { IncomesAndExpenseFields } from 'src/components/project/formComponents/IncomesAndExpenseFields'

const CustomStyledForm: any = styled(Styles.Form)`
  .form-section {
    margin-bottom: 0;
    padding-bottom: 0;
  }
`

class EditExpenseAndIncomeForm extends React.Component<
  EditExpenseAndIncomesChildProps
> {
  render() {
    const {
      type,
      selectedModal,
      handleCloseModal,
      handleSubmit,
      handleChange,
      values,
      error,
      loading
    } = this.props
    return (
      <EditFormModal
        title={type === 'incomes' ? 'Edit Incomes' : 'Edit Expenses'}
        isOpen={selectedModal === type}
        handleCloseModal={handleCloseModal}
        handleConfirm={handleSubmit}
        error={error && 'Something went wrong. Please try again later.'}
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
  }
}

export default EditExpenseAndIncomeForm
