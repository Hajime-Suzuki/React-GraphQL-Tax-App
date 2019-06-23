import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Field, Form, Formik, FormikProps } from 'formik'
import React, { FC } from 'react'
import {
  useAddUserExpenseMutation,
  UserExpenseInput
} from 'src/graphql/components/userExpenses'
import { renderTaxRateField } from 'src/libs/forms/renderFields/renderDropdown'
import { renderFormikTextField } from 'src/libs/forms/renderFields/renderTextField'
import { StyledGridFormItem } from 'src/styles/forms'

const fields = [
  { name: 'name' },
  { name: 'date' },
  { name: 'price' },
  { name: 'taxRate', label: 'tax rate', type: 'number' },
  { name: 'quantity', type: 'number' }
]

const NewUserExpense: FC<{}> = () => {
  const mutation = useAddUserExpenseMutation()
  return (
    <Formik
      initialValues={{
        name: '',
        date: '',
        quantity: 0,
        price: '',
        taxRate: 0
      }}
      onSubmit={async values => {
        console.log(values)
        const res = await mutation({ variables: { data: values } })
        console.log({ res })
      }}
    >
      {(props: FormikProps<UserExpenseInput>) => {
        return (
          <Form>
            <StyledGridFormItem justify="center" container>
              {fields.map((form, i) => (
                <Grid item key={i} style={{ width: 180 }}>
                  {form.name !== 'taxRate' ? (
                    <Field
                      name={form.name}
                      label={form.label || form.name}
                      type={form.type || 'text'}
                      component={renderFormikTextField}
                    />
                  ) : (
                    renderTaxRateField({
                      value: props.values.taxRate || 0,
                      name: form.name,
                      showLabel: true,
                      onChange: props.handleChange
                    })
                  )}
                </Grid>
              ))}
              <Grid
                item
                xs={12}
                style={{ textAlign: 'center', marginTop: '4em' }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ margin: 'auto' }}
                >
                  Submit
                </Button>
              </Grid>
            </StyledGridFormItem>
          </Form>
        )
      }}
    </Formik>
  )
}

export default NewUserExpense
