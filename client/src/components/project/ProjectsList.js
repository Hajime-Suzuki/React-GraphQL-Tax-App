import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import styled from 'styled-components'
import { renderDropdown } from '../../libs/forms/renderDropdown'
import { renderStateMenuItems } from '../../libs/forms/renderStateMenuItem'
import { calcTotalvalueWithoutTax } from '../../libs/singleProject/totalValues'
import { routes } from '../../routes/constants'
import { StyledLink } from '../../styles/sharedStyles'
import { LoadingIcon } from '../UI/LoadingIcon'
import { format } from 'date-fns'

const StyledPaper = styled(Paper)`
  overflow: 'auto';
  width: ${(100 / 12) * 11}%;
  margin: auto;
`

const ProjectsList = props => {
  const { projects, handleChange, postingId, sortProjectByDate } = props
  return (
    <StyledPaper style={{ overflow: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell onClick={() => sortProjectByDate('date')}>
              Project Date
            </TableCell>
            <TableCell onClick={() => sortProjectByDate('invoiceDate')}>
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
              <TableRow key={p.get('id')} hover className="table-item">
                <TableCell>
                  <StyledLink
                    to={routes.singleProject(p.get('id'))}
                    weight="bold"
                  >
                    {p.get('name')}
                  </StyledLink>
                </TableCell>
                <TableCell>
                  {p.get('date') ? format(p.get('date'), 'Y-MM-dd') : '-'}
                </TableCell>
                <TableCell>
                  {p.get('invoiceDate')
                    ? format(p.get('invoiceDate'), 'Y-MM-dd')
                    : '-'}
                </TableCell>
                <TableCell>
                  {calcTotalvalueWithoutTax(p.get('incomes')) || '-'}
                </TableCell>
                {/* <TableCell>{p.get('location') || '-'}</TableCell> */}
                <TableCell>
                  {postingId === p.get('id') ? (
                    <LoadingIcon size="2em" />
                  ) : (
                    <Field
                      component={renderDropdown}
                      name={p.get('id')}
                      initialValue={p.get('status')}
                      onChange={handleChange}
                    >
                      {renderStateMenuItems()}
                    </Field>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </StyledPaper>
  )
}

export default reduxForm({ form: 'status' })(ProjectsList)
