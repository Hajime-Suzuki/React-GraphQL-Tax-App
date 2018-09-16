import { Record } from 'immutable'
import { decodeJwt } from '../../../libs/jwt'
import {
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_SUCCESS
} from '../signupLogin/signupLogin'

// const token = localStorage.getItem('jwt')
// const initialState = token ? decodeJwt(token).id : null

const userReducer = (state = null, { type, payload } = {}) => {
  return state
}

export default userReducer
