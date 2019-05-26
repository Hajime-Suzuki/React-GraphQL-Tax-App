import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import { format, parseISO } from 'date-fns'
import React, { FC } from 'react'
import { useGetFiscalProjectsQuery } from 'src/graphql/components/projects'
import { FiscalOverviewRouteProps } from 'src/routes/types'
import useRouter from 'use-react-router'
import { Calculations } from '../project/helper/calculations'
import { LoadingIcon } from '../UI/LoadingIcon'

const FiscalOverview: FC<{}> = () => {
  const {
    match: {
      params: { year }
    }
  } = useRouter<FiscalOverviewRouteProps>()

  const { data, loading, error } = useGetFiscalProjectsQuery({
    variables: { filter: { year: +year } }
  })

  if (!data || loading) return <LoadingIcon />
  if (error) return <div>{error.message}</div>

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Invoice Number</TableCell>
            <TableCell>Invoice Date</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.projects.map((project, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{project.invoiceNumber}</TableCell>
                <TableCell>
                  {format(parseISO(project.invoiceDate), 'yyy-MM-dd')}
                </TableCell>
                <TableCell>
                  {project.incomes && Calculations.getSubtotal(project.incomes)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default FiscalOverview
