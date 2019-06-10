import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { EditIcon } from 'src/view/UI/EditIcon'
import { SingleProjectChildProps } from '..'
import Button from '@material-ui/core/Button'
import { withRouter, RouteComponentProps } from 'react-router'
import { RoutesNames } from 'src/routes/constants'
import {
  GetClientsListProps,
  withGetClientsList
} from 'src/graphql/components/clients'

type OwnProps = Pick<SingleProjectChildProps, 'client' | 'handleOpenModal'> &
  RouteComponentProps

type Props = GetClientsListProps<OwnProps>

const ClientSection: React.FunctionComponent<Props> = (props: Props) => {
  const { client, handleOpenModal, data } = props
  const redirectToAddClient = () => props.history.push(RoutesNames.addClient)

  if (!data || !data.getClientsByUser || (data.loading && !client)) return null

  if (!data.getClientsByUser.length) {
    return (
      <Button
        color="secondary"
        variant="outlined"
        onClick={redirectToAddClient}
      >
        Add Client
      </Button>
    )
  }

  if (!client) {
    return (
      <div>
        <Button
          color="secondary"
          variant="outlined"
          onClick={handleOpenModal('client')}
        >
          Pick Client
        </Button>
      </div>
    )
  }

  return (
    <React.Fragment>
      <hr style={{ width: '100%', margin: '2em 0' }} />
      <Grid item xs={11} sm={6}>
        <Typography>Contact Person</Typography>
        <React.Fragment>
          <Typography>
            {client.firstName} {client.lastName}
          </Typography>
          <Typography>{client.email}</Typography>
          <Typography>{client.phone}</Typography>
          <EditIcon
            onClick={handleOpenModal('client')}
            style={{ marginLeft: '10px' }}
          />
        </React.Fragment>
      </Grid>
    </React.Fragment>
  )
}

export default withRouter(withGetClientsList<OwnProps>({})(ClientSection))
