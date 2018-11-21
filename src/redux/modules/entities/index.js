import { combineReducers } from 'redux'
import userReducer from './user'
import projectReducer from './project'
import { API_getEntities } from '../../api'
import { normalize, schema } from 'normalizr'
import { extractErrorMessage } from '../../../libs/error'

export const FETCH_ENTITIES_REQUEST = 'FETCH_ENTITIES_REQUEST'
export const FETCH_ENTITIES_FAILED = 'FETCH_ENTITIES_FAILED'
export const FETCH_ENTITIES_SUCCESS = 'FETCH_ENTITIES_SUCCESS'

const projectSchema = new schema.Entity('projects')
const userSchema = new schema.Entity('user', {
  projects: [projectSchema]
})

export const getEntities = type => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_ENTITIES_REQUEST })
    const data = await API_getEntities(getState().user.getId())

    const normalized = normalize(data.user, userSchema)
    const test = {
      status: 'none',
      invoiceNumber: '88380',
      name: 'Ergonomic Granite Salad34',
      streetAddress: '4150 Shanna Locks Apt. 364',
      city: 'South Roselynfurt',
      user: '5bb90a6db502315990f6ff4a',
      date: '2018 - 05 - 27 22: 34: 02.527',
      invoiceDate: '2018 - 05 - 30 19: 19: 36.121'
    }
    normalized.projects = normalized.projects || [test]
    // console.log(normalized)
    dispatch({ type: FETCH_ENTITIES_SUCCESS, payload: normalized })
  } catch (e) {
    console.log(e)
    dispatch({
      type: FETCH_ENTITIES_FAILED,
      payload: extractErrorMessage(e)
    })
  }
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
