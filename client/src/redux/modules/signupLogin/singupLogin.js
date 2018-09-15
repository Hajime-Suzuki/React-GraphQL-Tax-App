import { Record } from 'immutable'
import { loginAxios } from '../../../axios'
import { userAxios } from '../../../axios'
import { decodeJwt, storeJwt } from '../../../libs/jwt'

const LOGIN_REQUEST = 'signupLogin/LOGIN_REQUEST'
const LOGIN_FAILED = 'signupLogin/LOGIN_FAILED'
export const LOGIN_SUCCESS = 'signupLogin/LOGIN_SUCCESS'

const SIGNUP_REQUEST = 'signupLogin/SIGNUP_REQUEST'
const SIGNUP_FAILED = 'signupLogin/SIGNUP_FAILED'
export const SIGNUP_SUCCESS = 'signupLogin/SIGNUP_SUCCESS'

export const LOGOUT = 'signupLogin/LOGOUT'

export const loginRequest = userData => async dispatch => {
  try {
    dispatch({
      type: LOGIN_REQUEST
    })
    const token = await loginAxios
      .post('/', userData)
      .then(({ data }) => data.jwt)

    storeJwt(token)

    const decoded = decodeJwt(token)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        id: decoded.id
      }
    })
  } catch (e) {
    console.log(e.response.data)
    dispatch({
      type: LOGIN_FAILED,
      payload: {
        error: e.response.data
      }
    })
  }
}

export const signupRequest = userData => async dispatch => {
  try {
    dispatch({
      type: SIGNUP_REQUEST
    })

    const { user, jwt } = await userAxios
      .post('/', userData)
      .then(({ data }) => data)

    storeJwt(jwt)

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: {
        id: user._id
      }
    })
  } catch (e) {
    console.log(e)
    console.log(e.response.data)
    dispatch({
      type: SIGNUP_FAILED,
      payload: {
        error: e.response.data
      }
    })
  }
}

export const logOut = () => {
  localStorage.removeItem('jwt')
  return { type: LOGOUT }
}

const messageReducer = (state = null, { type, payload } = {}) => {
  switch (type) {
    case LOGIN_REQUEST:
      return 'pending'
    case SIGNUP_REQUEST:
      return 'pending'
    case LOGIN_FAILED:
      return payload.error
    case SIGNUP_FAILED:
      return payload.error
    case LOGIN_SUCCESS:
      return null
    case SIGNUP_SUCCESS:
      return null
    default:
      return state
  }
}

export default messageReducer
