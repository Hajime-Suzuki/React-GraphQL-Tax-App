import { Paper, TableRow } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import * as React from 'react'
import { GetClientsList } from 'src/graphql/components/clients'
import { routes } from 'src/routes/constants'
import { Styles } from 'src/styles/sharedStyles'

interface OwnProps {
  clients: GetClientsList.GetClientsByUser[]
}
const ClientsList: React.SFC<OwnProps> = props => {
  const { clients } = props
  return (
    <Styles.MainWrapper>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map(client => {
              return (
                <TableRow hover key={client.id}>
                  <TableCell>
                    <Styles.StyledLink
                      to={routes.singleClient(client.id)}
                      weight="bold"
                    >
                      {client.firstName} {client.lastName}
                    </Styles.StyledLink>
                  </TableCell>
                  <TableCell>{client.email || '-'}</TableCell>
                  <TableCell>{client.phone || '-'}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    </Styles.MainWrapper>
  )
}

export default ClientsList
