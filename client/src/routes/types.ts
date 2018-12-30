import { RouteComponentProps } from 'react-router'

export type IRouterComponentProps = RouteComponentProps<{ id: string }>

export interface PrivateRoutesChildProps extends RouteComponentProps<{}> {
  userId: string
}
