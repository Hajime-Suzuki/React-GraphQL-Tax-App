import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'
import styled from 'styled-components'
import { StyledLink } from '../../styles/sharedStyles'

const StyledPaper = styled(Paper)`
  overflow: 'auto';
  width: ${(100 / 12) * 11}%;
  margin: auto;
`

const ProjectsList = props => {
  const { projects } = props
  return (
    <StyledPaper style={{ overflow: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map(p => {
            return (
              <TableRow key={p.get('id')} hover>
                <TableCell>
                  <StyledLink
                    to={`/projects/${p.get('id')}`}
                    style={{ fontWeight: 'bold' }}
                  >
                    {p.get('name')}
                  </StyledLink>
                </TableCell>
                <TableCell>{p.get('date')}</TableCell>
                <TableCell>{p.get('rowPrice')}</TableCell>
                <TableCell>{p.get('location') || '-'}</TableCell>
                <TableCell>{p.get('status') || 'N/A'}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </StyledPaper>
  )
}

export default ProjectsList
