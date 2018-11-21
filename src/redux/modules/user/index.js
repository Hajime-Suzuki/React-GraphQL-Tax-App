import { decodeJwt, storeJwt } from '../../../libs/jwt'
import { loginOrSignupAndGetJwt } from '../../api'
import User from './model'

const LOGIN_SIGN_UP_REQUEST = 'user/LOGIN_REQUEST'
const LOGIN_SIGN_UP_FAILED = 'user/LOGIN_FAILED'
export const LOGIN_SIGN_UP_SUCCESS = 'user/LOGIN_SUCCESS'
export const LOGOUT = 'user/LOGOUT'

// type loginOrSingup = 'login' | 'signup'

// interface IUserData {
//   email: string
//   password: string
// }

// const loginRequest = createAction('user/LOGIN_REQUEST')
// const loginSignupSuccess = createAction(
//   'user/LOGIN_SUCCESS',
//   resolve => (token: string) => {
//     return resolve(decodeJwt(token).id as string)
//   }
// )

// export const loginOrSignup = (type: loginOrSingup, userData: any) => async (
//   dispatch: Dispatch
// ) => {
//   try {
//     dispatch(loginRequest())
//     const token = await loginOrSignupAndGetJwt(type, userData)
//     storeJwt(token)
//     dispatch(loginSignupSuccess(token))
//   } catch (e) {
//     console.log(e)
//     console.log(e.response && e.response.data)
//     dispatch({
//       type: LOGIN_SIGN_UP_FAILED,
//       payload: (e.response && e.response.data) || 'unknown error'
//     })
//   }
// }

export const loginOrSignup = (type, userData) => async dispatch => {
  try {
    dispatch({ type: LOGIN_SIGN_UP_REQUEST })
    const token = await loginOrSignupAndGetJwt(type, userData)
    storeJwt(token)
    dispatch({ type: LOGIN_SIGN_UP_SUCCESS, payload: decodeJwt(token).id })
  } catch (e) {
    console.log(e)
    console.log(e.response && e.response.data)
    dispatch({
      type: LOGIN_SIGN_UP_FAILED,
      payload: (e.response && e.response.data) || 'unknown error'
    })
  }
}

export const logout = () => {
  localStorage.removeItem('jwt')
  return { type: LOGOUT }
}

const userReducer = (state = new User(), { type, payload } = {}) => {
  switch (type) {
    case LOGIN_SIGN_UP_REQUEST:
      return state.loginSignupRequest()
    case LOGIN_SIGN_UP_FAILED:
      return state.loginSignupFailed(payload)
    case LOGIN_SIGN_UP_SUCCESS:
      return state.loginSignupSuccess(payload)
    case LOGOUT:
      return state.logout()
    default:
      return state
  }
}

export default userReducer
