import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as React from 'react'
import { renderFormikTextField } from 'src/libs/forms/renderFields/renderTextField'
import { StyledGridFormItem } from 'src/styles/forms'
import { LoginSignupChildProps } from './LoginAndSignupFormContainer'
import { Omit } from 'src/libs/types'

export default class SignupForm extends React.Component<
  Required<Omit<LoginSignupChildProps, 'login'>>
> {
  render = () => {
    return (
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
        onSubmit={this.props.signup}
      >
        {() => (
          <Form>
            <StyledGridFormItem
              container
              direction="column"
              alignItems="center"
              spacing={5}
            >
              <Grid item>
                <Field
                  name="firstName"
                  label="firstName"
                  component={renderFormikTextField}
                  required
                />
                <ErrorMessage name="firsName" component="div" />
              </Grid>
              <Grid item>
                <Field
                  name="lastName"
                  label="lastName"
                  component={renderFormikTextField}
                  required
                />
                <ErrorMessage name="lastName" component="div" />
              </Grid>
              <Grid item>
                <Field
                  name="email"
                  label="email"
                  component={renderFormikTextField}
                  required
                />
                <ErrorMessage name="email" component="div" />
              </Grid>
              <Grid item>
                <Field
                  type="password"
                  name="password"
                  label="password"
                  component={renderFormikTextField}
                  required
                />
                <ErrorMessage name="password" component="div" />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={this.props.loading}
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
