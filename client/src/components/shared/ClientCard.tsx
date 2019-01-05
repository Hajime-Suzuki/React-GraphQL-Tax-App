import { EditIcon } from '../UI/EditIcon'
import * as React from 'react'
import { SingleClient, ClientFragment } from 'src/graphql/components/clients'
import styled from 'styled-components'
import { theme } from 'src/styles/theme'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'

interface Props {
  client: Partial<SingleClient.GetSingleClient & ClientFragment.Fragment>
  handleOpenModal?: () => void
}
const ClientCard: React.SFC<Props> = ({ client, handleOpenModal }) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    streetAddress,
    postalCode,
    city
  } = client
  return (
    <CustomPaper>
      {handleOpenModal && (
        <div className="edit-button-wrapper">
          <EditIcon onClick={handleOpenModal} />
        </div>
      )}
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
        {streetAddress} {postalCode} {city}
      </Typography>
    </CustomPaper>
  )
}

const CustomPaper: any = styled(Paper)`
  padding: 2em;
  text-align: center;

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

export default ClientCard
