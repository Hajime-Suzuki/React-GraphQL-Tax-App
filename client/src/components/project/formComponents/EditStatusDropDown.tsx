import { Formik, FormikProps } from 'formik'
import * as React from 'react'
import { MutationFn, MutationResult } from 'react-apollo'
import { InvoiceStatus } from 'src/graphql/@types/types'
import { UpdateStatus } from 'src/graphql/components/projects'
import { renderStatusField } from 'src/libs/forms/renderFields/renderDropdown'
import { LoadingIcon } from '../../UI/LoadingIcon'

interface DropdownStatusProps {
  status: InvoiceStatus
}
interface OwnProps {
  projectId: string
}
interface StatusDropDownProps {
  onSubmit: MutationFn<UpdateStatus.Mutation, UpdateStatus.Variables>
  data?: MutationResult<UpdateStatus.Mutation>
}

export const EditStatusDropdown: React.SFC<
  DropdownStatusProps & OwnProps & StatusDropDownProps
> = props => {
  if (props.data && props.data.loading) return <LoadingIcon size={25} />

  return (
    <Formik
      onSubmit={(values: DropdownStatusProps) =>
        props.onSubmit({
          variables: {
            projectId: props.projectId,
            data: values
          }
        })
      }
      initialValues={{ status: props.status }}
      render={({
        values,
        handleChange,
        handleSubmit
      }: FormikProps<DropdownStatusProps>) => {
        return (
          <React.Fragment>
            {renderStatusField({
              value: values.status || '',
              onChange: e => {
                handleChange(e)
                handleSubmit()
              },
              name: 'status',
              showLabel: false
            })}
          </React.Fragment>
        )
      }}
    />
  )
}
