import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import * as React from 'react'

interface TaxOverviewsProps {
  items: {
    taxRate: string
    incomes?: string
    expenses?: string
    tax: string
  }[]
  type: 'incomes' | 'expenses'
}

const TaxOverview: React.FunctionComponent<TaxOverviewsProps> = ({
  items,
  type
}) => {
  const isIncomes = type === 'incomes'
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Tax Rate</TableCell>
          <TableCell>{isIncomes ? 'Incomes' : 'Expenses'} (excl)</TableCell>
          <TableCell>{isIncomes ? 'Tax to pay' : 'Tax to deduct'}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map(row => {
          return (
            <TableRow key={row.taxRate}>
              <TableCell>{row.taxRate}</TableCell>
              <TableCell>{row.incomes || row.expenses}</TableCell>
              <TableCell>{row.tax}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default TaxOverview
