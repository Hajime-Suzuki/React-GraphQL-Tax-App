import { loginAxios as axios } from '../../../axios'
import { combineReducers } from 'redux'
import { decodeJwt } from '../../../libs/jwt'

const LOGIN_REQUEST = 'login/LOGIN_REQUEST'
const LOGIN_FAILED = 'login/LOGIN_FAILED'
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS'

export const loginRequest = userData => async dispatch => {
  try {
    const token = await axios.post('/', userData).then(({ data }) => data.jwt)
    const userId = decodeJwt(token)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        id: userId
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

const messageReducer = (state = null, { type, payload } = {}) => {
  switch (type) {
    case LOGIN_REQUEST:
      return null
    case LOGIN_FAILED:
      return payload.error
    case LOGIN_SUCCESS:
      return null
    default:
      return state
  }
}

const userReducer = (state = null, { type, payload } = {}) => {
  switch (type) {
    case LOGIN_REQUEST:
      return null
    case LOGIN_FAILED:
      return null
    case LOGIN_SUCCESS:
      return payload.id
    default:
      return state
  }
}

export default combineReducers({
  message: messageReducer,
  user: userReducer
})
