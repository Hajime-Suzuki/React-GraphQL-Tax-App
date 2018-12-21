import * as React from 'react'
import { withApollo, WithApolloClient } from 'react-apollo'
import { GetToken } from 'src/graphql/components/client/login'
import { GetProjectOverview } from 'src/graphql/components/projects'
import { IRouterComponentProps } from 'src/routes/types'
import { LoadingIcon } from '../UI/LoadingIcon'
import ProjectsList from './ProjectsList'
import differenceInDays from 'date-fns/differenceInDays'

type Props = GetToken.Props<IRouterComponentProps>
class ProjectsListContainer extends React.Component<WithApolloClient<Props>> {
  // handleChange = (e, newValue, previousValue, projectId) => {
  //   this.props.updateStaus(projectId, newValue)
  // }
  sortProjectsByProjectDate = () => {
    const {
      client,
      match: {
        params: {}
      }
    } = this.props
    const { userId } = client.cache.readQuery<GetToken.Query>({
      query: GetToken.Document
    })!

    const queryOption = {
      query: GetProjectOverview.Document,
      variables: { userId }
    }

    const data = client.cache.readQuery<GetProjectOverview.Query>(queryOption)
    if (!data) return

    const newData = data.getProjectsByUserId.slice().sort((p1, p2) => {
      return differenceInDays(p1.date || '0', p2.date || '0')
    })
    console.log(
      'prev: ',
      JSON.stringify(
        data.getProjectsByUserId.slice(0, 10).map(v => v.date),
        null,
        2
      )
    )

    console.log(
      ' cur: ',
      JSON.stringify(newData.slice(0, 10).map(v => v.date), null, 2)
    )
    client.cache.writeQuery({
      ...queryOption,
      data: newData
    })
    // client.writeData({
    //   data: {
    //     __typename: 'Query',
    //     test: 'TIASEHTNIAESHNTIOEAN'
    //   }
    // })
  }
  render() {
    const userId = this.props.data!.userId
    if (!userId) return null

    return (
      <GetProjectOverview.Component variables={{ userId }}>
        {({ data, loading, error }) => {
          console.log(data)
          if (loading) return <LoadingIcon />
          if (error) return <p>{error.message}</p>
          if (!data) return null
          return (
            <ProjectsList
              projects={data.getProjectsByUserId}
              sortProjectsByProjectDate={this.sortProjectsByProjectDate}
            />
          )
        }}
      </GetProjectOverview.Component>
    )
  }
}

export default withApollo<WithApolloClient<Props>>(
  GetToken.HOC<any>({})(ProjectsListContainer)
)
