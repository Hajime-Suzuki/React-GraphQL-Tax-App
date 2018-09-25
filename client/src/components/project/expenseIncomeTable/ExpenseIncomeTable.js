import React from 'react'
import {
  calcTotalvalueWithoutTax,
  calcOnlyTax
} from '../../../libs/singleProject/totalValues'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Typography from '@material-ui/core/Typography'

const renderItems = items => {
  return items.map((item, i) => {
    return (
      <TableRow key={i}>
        <TableCell>{item.get('name')}</TableCell>
        <TableCell>{item.get('price')}</TableCell>
        <TableCell>{item.get('taxRate')}</TableCell>
      </TableRow>
    )
  })
}

const renderTotalRows = (type, items) => {
  const totalValue =
    type === 'total' ? calcTotalvalueWithoutTax(items) : calcOnlyTax(items)
  const text = type === 'total' ? 'Total' : 'Tax Total'
  return (
    <TableRow>
      <TableCell>
        <Typography variant="title">{text}</Typography>
      </TableCell>
      <TableCell>{totalValue}</TableCell>
      <TableCell>-</TableCell>
    </TableRow>
  )
}

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
          {renderTotalRows('total', items)}
          {renderTotalRows('tax', items)}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default ExpenseIncomeTable
