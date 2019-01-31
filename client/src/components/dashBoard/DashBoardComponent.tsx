import * as React from 'react'
import { LoadingIcon } from '../UI/LoadingIcon'
import Typography from '@material-ui/core/Typography'
import { GetProjectOverview } from 'src/graphql/components/projects'
import DashBoard from './DashBoard'

type Props = GetProjectOverview.Props<{}>
class DashBoardContainer extends React.Component<Props> {
  render() {
    const { data } = this.props
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
}

export default GetProjectOverview.HOC({})(DashBoardContainer)
