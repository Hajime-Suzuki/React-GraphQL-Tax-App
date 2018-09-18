import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

const ProjectsList = props => {
  return (
    <Grid container justify="center" spacing={24}>
      {props.projects.map(p => {
        return (
          <Grid key={p.get('id')} item xs={10} md={5} lg={4}>
            <Card>
              <Typography>{p.get('name')}</Typography>
              <Typography>€{p.get('rowPrice')}</Typography>
              <Typography>{p.get('taxRate')}%</Typography>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ProjectsList
