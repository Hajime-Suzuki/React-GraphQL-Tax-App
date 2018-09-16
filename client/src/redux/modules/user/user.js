import { Record } from 'immutable'
import PropTypes from 'prop-types'
import { loginAxios } from '../../../axios'
import { decodeJwt, storeJwt } from '../../../libs/jwt'
import { loginAndGetJwt } from '../../api'

const LOGIN_REQUEST = 'signupLogin/LOGIN_REQUEST'
const LOGIN_FAILED = 'signupLogin/LOGIN_FAILED'
export const LOGIN_SUCCESS = 'signupLogin/LOGIN_SUCCESS'

const SIGNUP_REQUEST = 'signupLogin/SIGNUP_REQUEST'
const SIGNUP_FAILED = 'signupLogin/SIGNUP_FAILED'
export const SIGNUP_SUCCESS = 'signupLogin/SIGNUP_SUCCESS'

export const LOGOUT = 'signupLogin/LOGOUT'

const token = localStorage.getItem('jwt')
const userId = token ? decodeJwt(token).id : null

export const loginRequest = userData => async dispatch => {
  try {
    dispatch({
      type: LOGIN_REQUEST
    })

    const token = await loginAndGetJwt(userData)

    storeJwt(token)
    const decoded = decodeJwt(token)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: decoded.id
    })
  } catch (e) {
    console.log(e)

    console.log(e.response && e.response.data)
    dispatch({
      type: LOGIN_FAILED,
      payload: (e.response && e.response.data) || 'unknown error'
    })
  }
}

const initialState = {
  userId,
  _status: {
    fetching: false,
    message: null
  }
}

export const UserType = PropTypes.shape({
  userId: PropTypes.string,
  _status: PropTypes.shape({
    fetching: PropTypes.bool,
    message: PropTypes.message
  })
})

class User extends Record(initialState) {
  loginSignupRequest() {
    return this.withMutations(s => {
      s.setIn(['_status', 'fetching'], true).setIn(['_status', 'message'], null)
    })
  }
  loginSignupSuccess(userId) {
    return this.withMutations(s => {
      s.set('userId', userId)
        .setIn(['_status', 'fetching'], false)
        .setIn(['_status', 'message'], null)
    })
  }
  loginSignupFailed(message) {
    return this.withMutations(s => {
      s.setIn(['_status', 'fetching'], false).setIn(
        ['_status', 'message'],
        message
      )
    })
  }
  logout() {
    return this.set('userId', null)
  }
}

const userReducer = (state = new User(), { type, payload } = {}) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return state.loginSignupSuccess(payload)
    case SIGNUP_SUCCESS:
      return state.loginSignupSuccess(payload)
    case LOGIN_FAILED:
      return state.loginSignupFailed(payload)
    case LOGIN_REQUEST:
      return state.loginSignupRequest()
    case LOGOUT:
      return state.logout()
    default:
      return state
  }
}

export default userReducer
