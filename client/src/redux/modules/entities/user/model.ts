import { Record } from 'immutable'

const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  projects: null,
  createdAt: null
}

class User extends Record(initialState) {
  setUser(data) {
    // console.log(data)

    const userId = data.result
    const userData = data.entities.user[userId]
    // console.log(userData)

    return new User(userData)
  }
}

export default User
