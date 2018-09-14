import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

const DashBoard = props => {
  return (
    <Grid container justify="center" spacing={24}>
      {props.projects.map(p => {
        return (
          <Grid key={p.id} item xs={10} md={5} lg={4}>
            <Card>
              <Typography>{p.name}</Typography>
              <Typography>€{p.rowPrice}</Typography>
              <Typography>{p.taxRate}%</Typography>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}
export default DashBoard
