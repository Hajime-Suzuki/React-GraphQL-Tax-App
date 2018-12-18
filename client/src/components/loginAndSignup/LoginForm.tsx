import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as React from 'react'
import { renderFormikTextField } from 'src/libs/forms/renderTextField'
import { Login } from 'src/graphql/components/login'
import { StyledGridFormItem } from 'src/styles/forms'

interface Props {
  login: Login.MutationFn
}
export default class LoginForm extends React.Component<Props> {
  handleSubmit = ({ email, password }) => {
    this.props.login({ variables: { email, password } })
  }

  render = () => {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={this.handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <StyledGridFormItem
              container
              direction="column"
              alignItems="center"
              spacing={40}
            >
              <Grid item>
                <Field
                  name="email"
                  label="email"
                  component={renderFormikTextField}
                />
                <ErrorMessage name="email" component="div" />
              </Grid>
              <Grid item>
                <Field
                  type="password"
                  name="password"
                  label="password"
                  component={renderFormikTextField}
                />
                <ErrorMessage name="password" component="div" />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  // disabled={isSubmitting}
                >
                  submit
                </Button>
              </Grid>
            </StyledGridFormItem>
          </Form>
        )}
      </Formik>
    )
  }
}
