import { Record } from 'immutable'

import { decodeJwt } from '../../../libs/jwt'
import {
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_SUCCESS
} from '../signupLogin/singupLogin'

const token = localStorage.getItem('jwt')
const userId = token ? decodeJwt(token).id : null

const userRecord = Record({
  id: userId
})

class User extends userRecord {
  setUserId(payload) {
    return this.set(userId, payload)
  }
}

const userReducer = (state = new User(), { type, payload } = {}) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return state.setUserId(payload)
    case SIGNUP_SUCCESS:
      return state.setUserId(payload)
    case LOGOUT:
      return state.setUserId(null)
    default:
      return state
  }
}

export default userReducer
