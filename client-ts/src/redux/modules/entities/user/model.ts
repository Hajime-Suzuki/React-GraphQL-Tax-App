import { Record } from 'immutable'

interface IUser {
  id: string | null
  firstName: string | null
  lastName: string | null
  email: string | null
  projects: any[] | null
  createdAt: Date | null
}
const initialState: IUser = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  projects: null,
  createdAt: null
}

interface IData {
  result: string
  entities: {
    user: IUser[]
    [entitiy: string]: any
  }
}
class User extends Record(initialState) {
  setUser(data: IData) {
    // console.log(data)

    const userId = data.result
    const userData = data.entities.user[userId]
    // console.log(userData)

    return new User(userData)
  }
}

export default User
