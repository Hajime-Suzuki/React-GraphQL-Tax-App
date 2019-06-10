import { Get_UserQuery } from '../components/login'
import { GetSingleProjectQuery } from '../components/projects'
import { GetUserProfileQuery } from '../components/userProfile'

export type QUser = Get_UserQuery['getUser']
export type QSingleProject = GetSingleProjectQuery['project']
export type QGetUserProfile = GetUserProfileQuery['getUser']
