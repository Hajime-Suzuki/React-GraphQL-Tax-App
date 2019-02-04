import * as React from 'react'
import { GetProjectOverview } from 'src/graphql/components/projects'
import TaxOverview from './TaxOverview'

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
