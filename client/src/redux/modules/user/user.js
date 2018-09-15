import { Record, Collection } from 'immutable'

import { decodeJwt } from '../../../libs/jwt'
import {
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_SUCCESS
} from '../signupLogin/singupLogin'

const token = localStorage.getItem('jwt')
const userId = token ? decodeJwt(token).id : null

const userRecord = Record({
  userId
})

export class User extends userRecord {
  getUserId() {
    return this.userId
  }
  setUserId(payload) {
    return this.set(userId, payload)
  }
}

const userReducer = (state, { type, payload } = {}) => {
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
