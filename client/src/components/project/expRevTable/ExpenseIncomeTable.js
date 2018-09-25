import React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Typography from '@material-ui/core/Typography'

const renderItems = items => {
  return items.map(item => {
    return (
      <TableRow key={item.get('id')}>
        <TableCell>{item.get('name')}</TableCell>
        <TableCell>{item.get('price')}</TableCell>
        <TableCell>{item.get('taxRate')}</TableCell>
      </TableRow>
    )
  })
}

const getTotalTaxValue = items =>
  items.reduce(
    (total, item) => (total += (item.get('price') * item.get('taxRate')) / 100),
    0
  )

const getTotalValue = items =>
  items.reduce((total, item) => (total += item.get('price')), 0)

const ExpenseIncomeTable = props => {
  const { items } = props
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Tax Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderItems(items)}
          <TableRow>
            <TableCell>
              <Typography variant="title">Total</Typography>
            </TableCell>
            <TableCell>{getTotalValue(items)}</TableCell>
            <TableCell>-</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="title">Tax Total</Typography>
            </TableCell>
            <TableCell>{getTotalTaxValue(items)}</TableCell>
            <TableCell>-</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default ExpenseIncomeTable
