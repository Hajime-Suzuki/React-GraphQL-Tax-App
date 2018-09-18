import { Record, fromJS, Map } from 'immutable'

let initialState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  projects: null,
  createdAt: null
}

class User extends Record(initialState) {
  setUser(data) {
    const userId = data.result
    const userData = data.entities.user[userId]
    return new User(userData)
  }
  test() {
    console.log('usertest')
    return this.set('email', 'email!!')
  }
}

export default User
