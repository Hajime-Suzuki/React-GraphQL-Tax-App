import { Link } from 'react-router-dom'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import { cardPadding } from '../../styles/constants'

const StyledCard = styled(Card)`
  padding: ${cardPadding};
`

const ProjectsList = props => {
  return (
    <Grid container justify="center" spacing={24}>
      {props.projects.map(p => {
        return (
          <Grid key={p.get('id')} item xs={10} md={5} lg={4}>
            <Link to={`/projects/${p.get('id')}`}>
              <StyledCard>
                <Typography>{p.get('name')}</Typography>
                <Typography>€{p.get('rowPrice')}</Typography>
                <Typography>{p.get('taxRate')}%</Typography>
                <Typography>{p.get('status')}</Typography>
              </StyledCard>
            </Link>
          </Grid>
          //  </Link>
        )
      })}
    </Grid>
  )
}

export default ProjectsList
