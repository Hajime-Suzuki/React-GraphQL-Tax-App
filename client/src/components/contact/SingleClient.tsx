import * as React from 'react'
import { SingleClient as SC } from 'src/graphql/components/clients'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import { theme } from 'src/styles/theme'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { EditIcon } from '../UI/EditIcon'

interface OwnProps {
  client: SC.GetSingleClient
}

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
const SingleClient: React.SFC<OwnProps> = props => {
  const {
    firstName,
    lastName,
    email,
    phone,
    streetAddress,
    postalCode,
    city
  } = props.client

  return (
    <Container container justify="center">
      <Grid item xs={11} md={5}>
        <Paper className="card">
          <div className="edit-button-wrapper">
            <EditIcon onClick={() => console.log('test')} />
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
    </Container>
  )
}

export default SingleClient
