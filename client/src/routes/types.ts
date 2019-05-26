import { RouteComponentProps } from 'react-router'

export type IRouterComponentProps = RouteComponentProps<{ id: string }>
export type ProjectRouterComponentProps = RouteComponentProps<{
  id: string
}>

export interface PrivateRoutesChildProps extends RouteComponentProps<{}> {
  userId: string
}

export interface FiscalOverviewRouteProps {
  year: string
}
