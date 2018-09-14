import {
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  LOGOUT
} from '../signupLogin/singupLogin'
import { decodeJwt } from '../../../libs/jwt'

const token = localStorage.getItem('jwt')
const initialState = token ? decodeJwt(token).id : null

const userReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return payload.id
    case SIGNUP_SUCCESS:
      return payload.id
    case LOGOUT:
      return null
    default:
      return state
  }
}

export default userReducer
