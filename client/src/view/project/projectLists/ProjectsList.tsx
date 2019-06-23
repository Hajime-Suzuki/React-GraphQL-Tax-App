import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { format, parseISO } from 'date-fns'
import React from 'react'
import styled from 'styled-components'
import { ProjectListChildProps } from '.'
import { RoutesNames } from '../../../routes/route-names'
import { Styles } from '../../../styles/sharedStyles'
import { Calculations } from '../helper/calculations'
import EditStatusContainer from './EditStatusContainer'

const StyledPaper: any = styled(Paper as any)`
  overflow: 'auto';
  width: ${(100 / 12) * 11}%;
  margin: auto;
`

const ProjectsList: React.FunctionComponent<ProjectListChildProps> = props => {
  const {
    projects,
    sortProjectsByProjectDate,
    sortProjectByInvoiceDate
  } = props
  return (
    <StyledPaper style={{ overflow: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell onClick={sortProjectsByProjectDate}>
              Project Date
            </TableCell>
            <TableCell onClick={sortProjectByInvoiceDate}>
              Invoice Date
            </TableCell>
            <TableCell>Price(excl)</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map(p => {
            return (
              <TableRow key={p.id} hover className="table-item">
                <TableCell>
                  <Styles.StyledLink
                    to={RoutesNames.singleProject(p.id)}
                    weight="bold"
                  >
                    {p.name}
                  </Styles.StyledLink>
                </TableCell>
                <TableCell>
                  {p.projectDate
                    ? format(parseISO(p.projectDate), 'Y-MM-dd')
                    : '-'}
                </TableCell>
                <TableCell>
                  {p.invoiceDate
                    ? format(parseISO(p.invoiceDate), 'Y-MM-dd')
                    : '-'}
                </TableCell>
                <TableCell>
                  {Calculations.getSubtotal(p.incomes || [])}
                </TableCell>
                <TableCell>
                  <EditStatusContainer status={p.status} projectId={p.id} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </StyledPaper>
  )
}

export default ProjectsList
