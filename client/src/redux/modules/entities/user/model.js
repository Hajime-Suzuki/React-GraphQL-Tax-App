import { Record } from 'immutable'

const initalState = {
  user: null
}

class User extends Record(initalState) {
  setUse(user) {
    return this.set('user', user)
  }
}

export default User
