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
  setId(val) {
    return this.set('userId', val)
  }
}

const userReducer = (state, { type, payload } = {}) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return state.setId(payload.id)
    case SIGNUP_SUCCESS:
      return state.setId(payload.id)
    case LOGOUT:
      return state.setId(null)
    default:
      return state
  }
}

export default userReducer
