import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import * as React from 'react'
import { DashBoardProps } from './DashBoard'
import { currentQuarterProjectSelector as currentSemester } from './selectors/currentQuarter'

class TaxOverview extends React.PureComponent<DashBoardProps> {
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
        {this.getTableSettings().map(row => {
          return (
            <TableRow key={row.taxRate}>
              <TableCell>{row.taxRate}</TableCell>
              <TableCell>{row.incomes}</TableCell>
              <TableCell>{row.tax}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )

  getTableSettings = () => {
    const projects = this.props.projects
    const grandTotalIncomes = currentSemester.getTotalValues(projects)
    console.log(grandTotalIncomes)

    return [
      {
        taxRate: '21%',
        incomes: grandTotalIncomes['21'].incomes,
        tax: grandTotalIncomes['21'].tax
      },
      {
        taxRate: '9%',
        incomes: grandTotalIncomes['9'].incomes,
        tax: grandTotalIncomes['9'].tax
      },
      {
        taxRate: '0%',
        incomes: grandTotalIncomes['0'].incomes,
        tax: grandTotalIncomes['0'].tax
      }
    ]
  }
}

export default TaxOverview
