import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { format } from 'date-fns'
import React from 'react'
import {
  GetProjectOverview,
  UpdateStatus
} from 'src/graphql/components/projects'
import { calcTotalvalueWithoutTax2 } from 'src/libs/singleProject/totalValues'
import styled from 'styled-components'
import { routes } from '../../routes/constants'
import { StyledLink } from '../../styles/sharedStyles'
import { StatusDropdown } from './formConponents/StatusDropDown'

const StyledPaper: any = styled(Paper)`
  overflow: 'auto';
  width: ${(100 / 12) * 11}%;
  margin: auto;
`
interface Props {
  projects: GetProjectOverview.GetProjectsByUserId[]
  sortProjectsByProjectDate: () => void
}

const ProjectsList: React.SFC<Props> = props => {
  const { projects, sortProjectsByProjectDate } = props
  return (
    <StyledPaper style={{ overflow: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell onClick={sortProjectsByProjectDate}>
              Project Date
            </TableCell>
            <TableCell onClick={() => console.log('invoice date')}>
              Invoice Date
            </TableCell>
            <TableCell>Price</TableCell>
            {/* <TableCell>Location</TableCell> */}
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map(p => {
            return (
              <TableRow key={p.id} hover className="table-item">
                <TableCell>
                  <StyledLink to={routes.singleProject(p.id)} weight="bold">
                    {p.name}
                  </StyledLink>
                </TableCell>
                <TableCell>
                  {p.date ? format(p.date, 'Y-MM-dd') : '-'}
                </TableCell>
                <TableCell>
                  {p.invoiceDate
                    ? format(Number(p.invoiceDate), 'Y-MM-dd')
                    : '-'}
                </TableCell>
                <TableCell>
                  {calcTotalvalueWithoutTax2(p.incomes || [])}
                </TableCell>
                {/* <TableCell>{p.get('location') || '-'}</TableCell> */}
                <TableCell>
                  {/* <LoadingIcon size="2em" /> */}
                  <UpdateStatus.Component>
                    {(update, data) => (
                      <StatusDropdown
                        status={p.status}
                        projectId={p.id}
                        onSubmit={update}
                        data={data}
                      />
                    )}
                  </UpdateStatus.Component>
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
