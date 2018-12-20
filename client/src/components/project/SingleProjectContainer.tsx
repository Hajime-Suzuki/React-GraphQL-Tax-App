import * as React from 'react'
import { GetSingleProject } from 'src/graphql/components/projects'
import { RouteComponentProps } from 'react-router'

type OwnProps = RouteComponentProps<{ id: string }>

class SingleProjectContainer extends React.Component<
  GetSingleProject.Props<OwnProps>
> {
  render() {
    return 'single'
  }
}

export default GetSingleProject.HOC<OwnProps>({
  options: props => {
    return {
      variables: { id: props.match.params.id }
    }
  }
})(SingleProjectContainer)
