import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { format } from 'date-fns'
import React from 'react'
import { theme } from 'src/styles/theme'
import styled from 'styled-components'
import { SingleProjectChildProps } from '..'

const phone = theme.breakpoints.down('sm')
const tablet = theme.breakpoints.up('md')

const InvoiceMetaSectionWrapper: any = styled(Grid)`
  && {
    .title {
      text-align: center;
      ${phone} {
        margin-bottom: 20px;
      }
      ${tablet} {
        text-align: left;
      }
    }
    .details-wrapper {
      flex-direction: row;
      ${phone} {
        justify-content: center;
      }
      ${tablet} {
        justify-content: flex-end;
      }
    }
    .meta-item {
      width: 33%;
      text-align: center;
    }
  }
`

const InvoiceMetaSection: React.FunctionComponent<SingleProjectChildProps> = ({
  project: { name, invoiceNumber, invoiceDate, status },
  handleDownload,
  pdfLoading,
  pdfError
}) => {
  const iconColor =
    status === 'paid'
      ? 'primary'
      : status === 'invoice'
      ? 'secondary'
      : undefined
  return (
    <InvoiceMetaSectionWrapper
      item
      container
      alignItems="center"
      justify="center"
    >
      <Grid item xs={11} md={10}>
        <Typography variant="h3" className="title">
          {name}
        </Typography>
      </Grid>

      <Grid className="details-wrapper" item container xs={11} md={1}>
        <Grid className="meta-item" item xs={3} md={10}>
          <Icon className="far fa-file-alt" />
          <Typography className="invoice-number">{invoiceNumber}</Typography>
        </Grid>

        <Grid className="meta-item" item xs={3} md={10}>
          <Icon className="far fa-calendar-alt" />
          <Typography className="invoice-date">
            {invoiceDate ? format(invoiceDate, 'Y-MM-dd') : '-'}
          </Typography>
        </Grid>

        <Grid className="meta-item" item xs={3} md={10}>
          <Icon className="fas fa-check" color={iconColor} />
          <Typography className="invoice-date">{status}</Typography>
        </Grid>

        <Grid className="meta-item" item xs={3} md={10}>
          {pdfError && <Typography>{pdfError}</Typography>}
          <IconButton onClick={handleDownload} disabled={pdfLoading}>
            <Icon className="fas fa-file-download" />
          </IconButton>
        </Grid>
      </Grid>
    </InvoiceMetaSectionWrapper>
  )
}

export default InvoiceMetaSection
