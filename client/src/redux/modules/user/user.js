import { LOGIN_SUCCESS, SIGNUP_SUCCESS } from '../signupLogin/singupLogin'

const userReducer = (state = null, { type, payload } = {}) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return payload.id
    case SIGNUP_SUCCESS:
      return payload.id
    default:
      return state
  }
}

export default userReducer
