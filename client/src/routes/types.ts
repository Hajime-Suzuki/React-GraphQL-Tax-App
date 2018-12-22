import { RouteComponentProps } from 'react-router'

export type IRouterComponentProps = RouteComponentProps<{ id: string }>

export interface PrivateRoutesChildProps {
  userId: string
}
