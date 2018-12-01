import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import styled from 'styled-components'
import { cardPadding } from '../../styles/constants'
import TotalPrices from './incomesAndExpenses/TotalPrices'

const Wrapper: any = styled(Grid)`
  && {
    .title {
      margin-bottom: ${cardPadding};
    }
    .table {
      max-width: 900px;
      margin: auto;
    }
    .nav-icons {
      margin-top: ${cardPadding};
    }
  }
`

const StyledDiv = styled.div`
  color: black;
`

const DashBoard = props => {
  const { projects } = props
  return (
    <React.Fragment>
      <StyledDiv>test</StyledDiv>
      <Wrapper container justify="center">
        <Typography variant="display1" className="title">
          Current Period
        </Typography>
        <Grid item xs={11}>
          <Grid item className="table">
            <TotalPrices projects={projects} />
          </Grid>
          <Grid item className="nav-icons">
            <IconButton>
              <Icon className="far fa-caret-square-left" />
            </IconButton>
            <IconButton>
              <Icon className="far fa-caret-square-right" />
            </IconButton>
          </Grid>
        </Grid>
      </Wrapper>
    </React.Fragment>
  )
}
export default DashBoard
