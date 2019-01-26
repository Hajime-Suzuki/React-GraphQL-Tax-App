import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as React from 'react'
import { renderFormikTextField } from 'src/libs/forms/renderFields/renderTextField'
import { StyledGridFormItem } from 'src/styles/forms'
import { LoginSignupChildProps } from './LoginAndSignupFormContainer'

export default class LoginForm extends React.Component<
  Required<Pick<LoginSignupChildProps, 'login'>>
> {
  // handleSubmit = (values) => {
  //   this.props.login({ variables: { email, password } })
  // }

  render = () => {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={this.props.login}
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
