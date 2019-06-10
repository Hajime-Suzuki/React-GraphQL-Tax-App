import { Get_UserQuery } from '../components/login'
import { GetSingleProjectQuery } from '../components/projects'

export type QUser = Get_UserQuery['getUser']
export type QSingleProject = GetSingleProjectQuery['project']
