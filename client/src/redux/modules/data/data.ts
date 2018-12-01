import { normalize, schema } from 'normalizr'
import { userAxios as axios } from '../../../axios'
import { getJwt } from '../../../libs/jwt'
import { combineReducers } from 'C:/Users/Hajime/AppData/Local/Microsoft/TypeScript/3.0/node_modules/redux'

const FETCHING_DATA_REQUEST = 'user/FETCHING_DATA_REQUEST'
const FETCHING_DATA_FAILED = 'user/FETCHING_DATA_FAILED'
const FETCHING_DATA_SUCCESS = 'user/FETCHING_DATA_SUCCESS'

const projectSchema = new schema.Entity('projects')
const userSchema = new schema.Entity('user', {
  projects: [projectSchema]
})

export const getUserData = userId => async dispatch => {
  // add expiration check later
  try {
    dispatch({ type: FETCHING_DATA_REQUEST })

    const { user } = await axios
      .get(`/${userId}`, {
        headers: {
          authorization: getJwt()
        }
      })
      .then(({ data }) => data)

    const {
      result,
      entities: { projects, user: userData }
    } = normalize(user, userSchema)

    dispatch({
      type: FETCHING_DATA_SUCCESS,
      payload: {
        userId: result,
        projects,
        userData
      }
    })
  } catch (e) {
    console.log(e.response.data)
    dispatch({ type: FETCHING_DATA_FAILED })
  }
}

const projectReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case FETCHING_DATA_REQUEST:
      return {}
    case FETCHING_DATA_SUCCESS:
      return payload.projects
    default:
      return state
  }
}

const userReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case FETCHING_DATA_REQUEST:
      return {}
    case FETCHING_DATA_SUCCESS:
      return payload.userData
    default:
      return state
  }
}

const messageReducer = (state = null, { type }) => {
  switch (type) {
    case FETCHING_DATA_REQUEST:
      return 'pending'
    case FETCHING_DATA_FAILED:
      return 'something went wrong'
    case FETCHING_DATA_SUCCESS:
      return null
    default:
      return state
  }
}

export default combineReducers({
  user: userReducer as any,
  projects: projectReducer as any,
  message: messageReducer as any
})
