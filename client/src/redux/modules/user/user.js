import { normalize, schema } from 'normalizr'
import {
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  LOGOUT
} from '../signupLogin/singupLogin'
import { decodeJwt, getJwt } from '../../../libs/jwt'
import { userAxios as axios } from '../../../axios'

const token = localStorage.getItem('jwt')
const initialState = token ? decodeJwt(token).id : null

const projectSchema = new schema.Entity('project')
const userSchema = new schema.Entity('user', {
  projects: [projectSchema]
})

export const getUserData = userId => async dispatch => {
  //add expiration check later

  const { user } = await axios
    .get(`/${userId}`, {
      headers: {
        authorization: getJwt()
      }
    })
    .then(({ data }) => data)

  const normalized = normalize(user, userSchema)
  console.log(normalized)
}

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
