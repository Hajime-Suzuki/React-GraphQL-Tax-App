import { FETCH_ENTITIES_SUCCESS } from '..'
import { Projects } from './model'
import { getSingleUserRequest, API_createNewProject } from '../../../api'

const FETCH_SINGLE_REQUEST = 'entities/project/FETCH_SINGLE_REQUEST'
const FETCH_SINGLE_FAILED = 'entities/project/FETCH_SINGLE_FAILED'
const FETCH_SINGLE_SUCCESS = 'entities/project/FETCH_SINGLE_SUCCESS'

const CREATE_PROJECT_REQUEST = 'entities/project/CREATE_PROJECT_REQUEST'
const CREATE_PROJECT_FAILED = 'entities/project/CREATE_PROJECT_FAILED'
const CREATE_PROJECT_SUCCESS = 'entities/project/CREATE_PROJECT_SUCCESS'

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

export const createNewProject = data => async dispatch => {
  try {
    data.status = data.status || 'none'

    dispatch({ type: CREATE_PROJECT_REQUEST })
    const project = await API_createNewProject(data)
    dispatch({ type: CREATE_PROJECT_SUCCESS, payload: project })
  } catch (e) {
    console.log(e)
    dispatch({ type: CREATE_PROJECT_FAILED, payload: e.response.body })
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

    case CREATE_PROJECT_REQUEST:
      return state.requestCreatePost()
    case CREATE_PROJECT_FAILED:
      return state.failCreatePost(payload)
    case CREATE_PROJECT_SUCCESS:
      return state.successCreatePost(payload)

    default:
      return state
  }
}

export default reducer
