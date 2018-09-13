import { loginAxios } from '../../../axios'
import { userAxios } from '../../../axios'
import { decodeJwt } from '../../../libs/jwt'

const LOGIN_REQUEST = 'message/LOGIN_REQUEST'
const LOGIN_FAILED = 'message/LOGIN_FAILED'
export const LOGIN_SUCCESS = 'message/LOGIN_SUCCESS'

const SIGNUP_REQUEST = 'message/SIGNUP_REQUEST'
const SIGNUP_FAILED = 'message/SIGNUP_FAILED'
export const SIGNUP_SUCCESS = 'signup/SIGNUP_SUCCESS'

export const loginRequest = userData => async dispatch => {
  try {
    dispatch({
      type: LOGIN_REQUEST
    })
    const token = await loginAxios
      .post('/', userData)
      .then(({ data }) => data.jwt)
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
    console.log(user)

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

const messageReducer = (state = null, { type, payload } = {}) => {
  switch (type) {
    case LOGIN_REQUEST:
      return 'pending'
    case SIGNUP_REQUEST:
      return 'pending'
    case LOGIN_FAILED:
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
