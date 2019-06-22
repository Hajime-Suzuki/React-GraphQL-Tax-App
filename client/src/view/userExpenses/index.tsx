import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { format } from 'date-fns'
import React, { FC } from 'react'
import { useGetUserExpensesQuery } from 'src/graphql/components/userExpenses'
import { Currency } from 'src/libs/currency'
import { LoadingIcon } from '../UI/LoadingIcon'

const UserExpenses: FC<{}> = () => {
  const { data, loading, error } = useGetUserExpensesQuery()

  if (loading) return <LoadingIcon />
  if (error) return <div>{error.message}</div>
  if (!data) return <div>No expenses</div>
  return (
    <>
      <h1>Expenses...</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Tax Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.getUserExpenses.map(exp => {
            return (
              <TableRow key={exp.id}>
                <TableCell>{format(new Date(+exp.date), 'Y-MM-dd')}</TableCell>
                <TableCell>{exp.name}</TableCell>
                <TableCell>{Currency.format(exp.price)}</TableCell>
                <TableCell>{exp.quantity}</TableCell>
                <TableCell>{exp.taxRate}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default UserExpenses
