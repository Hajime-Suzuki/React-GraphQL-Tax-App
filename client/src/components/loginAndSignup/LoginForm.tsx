import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as React from 'react'
import { renderFormikTextField } from 'src/libs/forms/renderFields/renderTextField'
import { StyledGridFormItem } from 'src/styles/forms'
import { LoginSignupChildProps } from './LoginAndSignupFormContainer'
import { Omit } from 'src/libs/types'

export default class LoginForm extends React.Component<
  Required<Omit<LoginSignupChildProps, 'signup'>>
> {
  render = () => {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={this.props.login}
      >
        {() => (
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
                  required={true}
                  component={renderFormikTextField}
                />
                <ErrorMessage name="email" component="div" />
              </Grid>
              <Grid item>
                <Field
                  type="password"
                  name="password"
                  label="password"
                  required={true}
                  component={renderFormikTextField}
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
