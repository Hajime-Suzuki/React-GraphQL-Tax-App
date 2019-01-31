import * as React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import { DashBoardProps } from './DashBoard'
import { currentSemesterProjectSelector as currentSemester } from './selectors/currentSemester'

class TaxOverview extends React.PureComponent<DashBoardProps> {
  getTableSettings = () => {
    console.log(this.props.projects)
    const grandTotal = currentSemester.getTotalIncomes(this.props.projects)
    return [{ taxRate: '21%', incomes: grandTotal, expenses: '1123' }]
  }

  render = () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Tax Rate</TableCell>
          <TableCell>Incomes</TableCell>
          <TableCell>Tax to pay</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          {this.getTableSettings().map(row => {
            return (
              <React.Fragment key={row.taxRate}>
                <TableCell>{row.taxRate}</TableCell>
                <TableCell>{row.incomes}</TableCell>
                <TableCell>{row.expenses}</TableCell>
              </React.Fragment>
            )
          })}
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default TaxOverview
