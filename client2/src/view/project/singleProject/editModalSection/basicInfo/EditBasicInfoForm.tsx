import * as React from 'react'
import { renderDatePicker } from 'src/libs/forms/renderFields/renderDatePicker'
import { renderStatusField } from 'src/libs/forms/renderFields/renderDropdown'
import { renderFields } from 'src/libs/forms/renderFields/renderFields'
import { Styles } from 'src/styles/sharedStyles'
import styled from 'styled-components'
import { EditBasicInfoChildProps } from './EditBasicInfoFormContainer'
import EditFormModal from 'src/libs/forms/EditFormModal'
import { GenerateFieldSettings } from 'src/view/project/helper/genrateFieldSettings'

const CustomStyledForm: any = styled(Styles.Form)`
  .form-section {
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .title {
    margin-top: 2em;
  }
`

class EditBasicInfoForm extends React.Component<EditBasicInfoChildProps> {
  render() {
    const {
      openDeleteDialog,
      selectedModal,
      handleCloseModal,
      handleSubmit,
      handleChange,
      updateError,
      loading,
      values,
      setFieldValue,
      errors
    } = this.props
    return (
      <React.Fragment>
        <EditFormModal
          title="Edit Info"
          maxWidth="md"
          isOpen={selectedModal === 'basic'}
          handleCloseModal={handleCloseModal}
          handleConfirm={handleSubmit}
          handleDeleteDialogOpen={openDeleteDialog}
          error={updateError && 'Something went wrong. Please try again later.'}
          loading={loading}
        >
          <CustomStyledForm>
            <div className="form-section">
              {GenerateFieldSettings.generalFields.map((field, i) => {
                if (field.type === 'date') {
                  return (
                    <React.Fragment key={i}>
                      {renderDatePicker({
                        field,
                        values,
                        setFieldValue,
                        error: errors[field.name]
                      })}
                    </React.Fragment>
                  )
                }
                return (
                  <React.Fragment key={i}>{renderFields(field)}</React.Fragment>
                )
              })}
              {renderStatusField({
                value: values.status || '',
                name: 'status',
                id: 'status',
                onChange: handleChange
              })}
            </div>
          </CustomStyledForm>
        </EditFormModal>
      </React.Fragment>
    )
  }
}

export default EditBasicInfoForm
