import { FETCH_ENTITIES_SUCCESS } from '..'
import { Projects } from './model'
import { getSingleUserRequest } from '../../../api'

const FETCH_SINGLE_REQUEST = 'entities/project/FETCH_SINGLE_REQUEST'
const FETCH_SINGLE_FAILED = 'entities/project/FETCH_SINGLE_FAILED'
const FETCH_SINGLE_SUCCESS = 'entities/project/FETCH_SINGLE_SUCCESS'

export const getSingleProject = id => async dispatch => {
  try {
    dispatch({ type: FETCH_SINGLE_REQUEST })
    const data = await getSingleUserRequest(id)
    dispatch({ type: FETCH_SINGLE_SUCCESS, payload: data.project })
  } catch (e) {
    console.log(e)
    let message
    if (e.response.status === 404) {
      message = 'Not Found'
    }
    dispatch({ type: FETCH_SINGLE_FAILED, payload: message })
  }
}
const reducer = (state = new Projects(), { type, payload } = {}) => {
  switch (type) {
    case FETCH_ENTITIES_SUCCESS:
      return state.setProjects(payload)
    case FETCH_SINGLE_REQUEST:
      return state.fetchSingleProject()
    case FETCH_SINGLE_FAILED:
      return state.failSingleProject(payload)
    case FETCH_SINGLE_SUCCESS:
      return state.setSingleProject(payload)
    default:
      return state
  }
}

export default reducer
