import { Get_UserQuery } from '../components/login'
import { GetSingleProjectQuery } from '../components/projects'
import { GetUserProfileQuery } from '../components/userProfile'
import { GetClientsListQuery, SingleClientQuery } from '../components/clients'

export type QUser = Get_UserQuery['getUser']
export type QSingleProject = GetSingleProjectQuery['project']
export type QGetUserProfile = GetUserProfileQuery['getUser']
export type QGetClientsList = GetClientsListQuery['getClientsByUser']
export type QSingleClient = SingleClientQuery['getSingleClient']
