import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import * as React from 'react'
import { RoutesNames } from 'src/routes/constants'
import { Styles } from 'src/styles/sharedStyles'
import { ClientsListChildProps } from './ClientsListContainer'
import AddClientFormModal from './AddClientForm'

const ClientsList: React.FunctionComponent<ClientsListChildProps> = props => {
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
                      to={RoutesNames.singleClient(client.id)}
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
