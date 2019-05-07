import React, { FC, useState } from 'react'
import { LoadingIcon } from '../UI/LoadingIcon'
import Typography from '@material-ui/core/Typography'
import {
  GetProjectOverviewProps,
  withGetProjectOverview
} from 'src/graphql/components/projects'
import DashBoard from './DashBoard'
import { SelectedQuarterProvider } from './contexts'

type Props = GetProjectOverviewProps<{}>
const DashBoardContainer: FC<Props> = props => {
  const { data } = props
  if (!data) return null
  const { loading, error } = data
  if (loading) return <LoadingIcon />
  if (error) return <Typography>{error.message}</Typography>
  if (!data.projects || (data.projects && !data.projects.length)) {
    return (
      <Typography variant="display1">You don't have a project yet</Typography>
    )
  }
  return <DashBoard projects={data.projects} />
}

export default withGetProjectOverview({})(props => (
  <SelectedQuarterProvider>
    <DashBoardContainer {...props} />
  </SelectedQuarterProvider>
))
