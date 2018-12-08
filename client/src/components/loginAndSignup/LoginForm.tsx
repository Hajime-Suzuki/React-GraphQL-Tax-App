import * as React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { StyledGridFormItem } from 'src/styles/forms'
import Divider from '@material-ui/core/Divider'
import { LoginFn } from './loginQueryMutation'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Grid from '@material-ui/core/Grid'
import { renderFormikTextField } from 'src/libs/forms/renderTextField'

interface Props {
  login: LoginFn
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
                <Field name="email" component={renderFormikTextField} />
                <ErrorMessage name="email" component="div" />
              </Grid>
              <Grid item>
                <Field
                  type="password"
                  name="password"
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
