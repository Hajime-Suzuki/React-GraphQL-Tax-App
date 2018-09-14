import { decodeJwt } from '../../../libs/jwt'
import {
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_SUCCESS
} from '../signupLogin/singupLogin'

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
