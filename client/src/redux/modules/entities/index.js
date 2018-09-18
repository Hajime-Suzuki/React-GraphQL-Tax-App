import { combineReducers } from 'redux'
import userReducer from './user'
import projectReducer from './project'
import { getEntitiesRequest } from '../../api'
import { normalize, schema } from 'normalizr'

export const FETCH_ENTITIES_REQUEST = 'FETCH_ENTITIES_REQUEST'
export const FETCH_ENTITIES_FAILED = 'FETCH_ENTITIES_FAILED'
export const FETCH_ENTITIES_SUCCESS = 'FETCH_ENTITIES_SUCCESS'

const projectSchema = new schema.Entity('projects')
const userSchema = new schema.Entity('user', {
  projects: [projectSchema]
})

export const getEntities = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_ENTITIES_REQUEST })
    const data = await getEntitiesRequest(getState().user.getId())
    const normalized = normalize(data.user, userSchema)
    // console.log(normalized)

    dispatch({ type: FETCH_ENTITIES_SUCCESS, payload: normalized })
  } catch (e) {
    console.log(e)

    dispatch({
      type: FETCH_ENTITIES_FAILED,
      payload: (e.response && e.response.data) || 'unknown error'
    })
  }
}

export const test = () => {
  return { type: 'test' }
}

const initialState = { fetching: false, message: null }

const entitiesStatus = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case FETCH_ENTITIES_REQUEST:
      return { fetching: true, message: null }
    case FETCH_ENTITIES_FAILED:
      return { fetching: false, message: payload }
    case FETCH_ENTITIES_SUCCESS:
      return { fetching: false, message: null }
    default:
      return state
  }
}

export default combineReducers({
  user: userReducer,
  projects: projectReducer,
  _status: entitiesStatus
})
