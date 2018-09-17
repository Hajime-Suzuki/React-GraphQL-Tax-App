import { Record, fromJS, Map } from 'immutable'

let initialState = {
  id: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  projects: undefined,
  createdAt: undefined
}

class User extends Record(initialState) {
  setUser(data) {
    const userId = data.result
    const userData = data.entities.user[userId]
    return new User(userData)
  }
  test() {
    return this.withMutations(s => {
      s.setIn(['firstName'], 'ashtashtasht').updateIn(['projects'], p =>
        p.push('something!!!!!')
      )
    })
  }
}

export default User
