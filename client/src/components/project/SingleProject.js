import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'

import format from 'date-fns/format'
import styled from 'styled-components'
import { StyledLink } from '../../styles/sharedStyles'

const ProjectDetails = styled(Grid)`
  .invoice-number,
  .invoice-date {
    width: 30%;
    text-align: left;
  }
`

const SingleProject = ({ project: p }) => {
  if (!p) return null
  const c = p.get('contactPerson')
  console.log(c)

  return (
    <div>
      <ProjectDetails container>
        <Grid item xs={11} sm={6}>
          <Typography variant="display1">{p.get('name')}</Typography>
        </Grid>
        <Grid item xs={11} sm={6}>
          <Grid container justify="flex-end">
            <Icon className="far fa-file-alt" />
            <Typography className="invoice-number">
              {p.get('invoiceNumber')}
            </Typography>
          </Grid>
          <Grid container justify="flex-end">
            <Icon className="far fa-calendar-alt" />
            <Typography className="invoice-date">
              {format(p.get('date'), 'YYYY-MM-DD')}
            </Typography>
          </Grid>
          <Grid container justify="flex-end">
            <Typography className="invoice-date">
              Status: {p.get('status')}
            </Typography>
          </Grid>
        </Grid>
        <hr style={{ width: '100%' }} />
        <Grid item xs={11} sm={6}>
          <Typography>Price(Excl.): €{p.get('rowPrice')}</Typography>
          <Typography>
            Price(Incl.): €{p.get('rowPrice') * (1 + p.get('taxRate') / 100)}
          </Typography>
          <Typography>
            Tax: €{(p.get('rowPrice') * p.get('taxRate')) / 100}
          </Typography>
          <Typography>
            Expense: €
            {p
              .get('expenses')
              .reduce((total, exp) => (total += exp.get('price')), 0)}
          </Typography>
        </Grid>
        <Grid item xs={11} sm={6}>
          {c && (
            <Fragment>
              <Typography>
                <a href={c.get('link')} target="_blank">
                  {c.get('firstName')} {c.get('lastName')}
                </a>
              </Typography>
              <Typography>{c.get('email')}</Typography>
              <Typography>{c.get('phone')}</Typography>
            </Fragment>
          )}
        </Grid>
      </ProjectDetails>
    </div>
  )
}

export default SingleProject
