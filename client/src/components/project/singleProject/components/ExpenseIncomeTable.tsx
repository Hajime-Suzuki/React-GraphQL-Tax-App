import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { GetSingleProject } from 'src/graphql/components/projects'
import { Currency } from 'src/libs/currency'

interface Props {
  items: GetSingleProject.Incomes[] | GetSingleProject.Expenses[]
  totalValues: {
    subtotal?: string
    tax: string
    total: string
  }
  type: 'expenses' | 'incomes'
}

const ExpenseIncomeTable: React.SFC<Props> = props => {
  const { items, totalValues, type } = props
  const isIncome = type === 'incomes'
  return (
    <Paper style={{ overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Tax Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderItems(items)}
          {isIncome && renderTotalRows('subtotal', totalValues)}
          {renderTotalRows('tax', totalValues)}
          {renderTotalRows('total', totalValues)}
        </TableBody>
      </Table>
    </Paper>
  )
}

const renderItems = (items: Props['items']) => {
  return items.map((item, i) => {
    return (
      <TableRow key={i}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{Currency.format(item.price)}</TableCell>
        <TableCell>{item.quantity}</TableCell>
        <TableCell>{item.taxRate}%</TableCell>
      </TableRow>
    )
  })
}

const renderTotalRows = (
  type: 'subtotal' | 'tax' | 'total',
  totalValues: Props['totalValues']
) => {
  const totalValue =
    type === 'subtotal'
      ? totalValues.subtotal
      : type === 'tax'
      ? totalValues.tax
      : type === 'total'
      ? totalValues.total
      : null

  const text =
    type === 'subtotal'
      ? 'Subtotal'
      : type === 'tax'
      ? 'VAT'
      : type === 'total'
      ? 'Total'
      : null
  return (
    <TableRow>
      <TableCell>
        <Typography variant="title">{text}</Typography>
      </TableCell>
      <TableCell>{totalValue}</TableCell>
      <TableCell>-</TableCell>
      <TableCell>-</TableCell>
    </TableRow>
  )
}

export default ExpenseIncomeTable
