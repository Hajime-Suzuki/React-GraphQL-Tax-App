import * as React from 'react'
import { GetProjectOverview } from 'src/graphql/components/projects'
import TaxOverview from './TaxOverview'
import { ApolloError } from 'apollo-server-koa'

export interface DashBoardProps {
  projects: GetProjectOverview.Projects[]
}

class DashBoard extends React.Component<DashBoardProps> {
  render = () => (
    <>
      <TaxOverview {...this.props} />
    </>
  )
}

export default DashBoard
