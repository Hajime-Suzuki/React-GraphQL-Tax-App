import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Formik, FormikProps } from 'formik'
import * as React from 'react'
import { withRouter } from 'react-router'
import { SingleClient as SC } from 'src/graphql/components/clients'
import { Styles } from 'src/styles/sharedStyles'
import { theme } from 'src/styles/theme'
import styled from 'styled-components'
import EditFormModal from '../project/formComponents/modal/EditFormModal'
import { renderFields } from '../project/formComponents/renderFields/renderFields'
import { EditIcon } from '../UI/EditIcon'
import { SingleClientChildProps } from './SingleClientContainer'

const Container: any = styled(Grid)`
  .card {
    padding: 2em;
    text-align: center;
  }
  .edit-button-wrapper {
    text-align: right;
  }
  .avatar {
    background-color: ${theme.palette.secondary.main};
    width: 70;
    height: 70;
    margin: auto;
    margin-bottom: 1em;
  }
  .divider {
    margin: 1em 0;
  }
`
class SingleClient extends React.Component<SingleClientChildProps> {
  render() {
    const {
      handleOpenModal,
      client: {
        firstName,
        lastName,
        email,
        phone,
        streetAddress,
        postalCode,
        city
      }
    } = this.props

    return (
      <Container container justify="center">
        <Grid item xs={11} md={5}>
          <Paper className="card">
            <div className="edit-button-wrapper">
              <EditIcon onClick={handleOpenModal} />
            </div>
            <Avatar className="avatar">
              {firstName && firstName.slice(0, 1).toUpperCase()}
              {lastName && lastName.slice(0, 1).toUpperCase()}
            </Avatar>
            <Typography variant="h5">
              {firstName} {lastName}
            </Typography>
            <Divider className="divider" />
            <Typography variant="subtitle1">{email}</Typography>
            <Typography variant="subtitle1">{phone}</Typography>
            <Typography variant="subtitle1">
              {streetAddress}, {postalCode} {city}
            </Typography>
          </Paper>
        </Grid>
        <this.EditFormSection />
      </Container>
    )
  }

  EditFormSection = () => {
    const {
      client,
      updateClient,
      handleSubmit,
      isModalOpen,
      handleCloseModal,
      mutationResultProps: { loading, error }
    } = this.props

    return (
      <Formik
        onSubmit={handleSubmit(updateClient)}
        validateOnChange={false}
        initialValues={client}
        render={(props: FormikProps<SC.GetSingleClient>) => {
          const { handleSubmit, dirty } = props
          return (
            <EditFormModal
              maxWidth="sm"
              isOpen={isModalOpen}
              handleCloseModal={handleCloseModal}
              title="Edit Client Info"
              handleConfirm={handleSubmit}
              loading={loading || !dirty}
              error={error && error.message}
            >
              {getFieldSettings().map(field => {
                return (
                  <React.Fragment key={field.name}>
                    {renderFields(field)}
                  </React.Fragment>
                )
              })}
              <Styles.Form />
            </EditFormModal>
          )
        }}
      />
    )
  }
}

const getFieldSettings = () => {
  return [
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'email', label: 'Email' },
    { name: 'phone', label: 'Phone' },
    { name: 'streetAddress', label: 'Street Address' },
    { name: 'postalCode', label: 'Postal Code' },
    { name: 'city', label: 'City' }
  ]
}

export default withRouter(SingleClient)
