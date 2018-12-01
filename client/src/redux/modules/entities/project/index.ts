import { reset } from 'redux-form'
import { FETCH_ENTITIES_SUCCESS } from '..'
import { extractErrorMessage } from '../../../../libs/error'
import {
  API_createNewProject,
  API_updateProject,
  API_updateStatus,
  getSingleUserRequest
} from '../../../api'
import { Projects } from './model'

const SORT_BY_INVOICE_DATE = 'entities/project/SORT_BY_INVOICE_DATE'

const FETCH_REQUESET = 'entities/project/FETCH_REQUEST'
const FETCH_FAILED = 'entities/project/FETCH_FAILED'
const POST_REQUEST = 'entities/project/POST_REQUEST'
const POST_FAILED = 'entities/project/POST_FAILED'

const FETCH_SINGLE_SUCCESS = 'entities/project/FETCH_SINGLE_SUCCESS'
const CREATE_PROJECT_SUCCESS = 'entities/project/CREATE_PROJECT_SUCCESS'
const UPDATE_STATUS_SUCCESS = 'entities/project/UPDATE_STATUS_SUCCESS'
const UPDATE_PROJECT_SUCCESS = 'entities/project/UPDATE_PROJECT_SUCCESS'

export const getSingleProject = id => async dispatch => {
  try {
    dispatch({ type: FETCH_REQUESET })
    const data = await getSingleUserRequest(id)
    dispatch({ type: FETCH_SINGLE_SUCCESS, payload: data.project })
  } catch (e) {
    console.log(e)
    dispatch({ type: FETCH_FAILED, payload: extractErrorMessage(e) })
  }
}

export const createNewProject = data => async dispatch => {
  try {
    data.status = data.status || 'none'
    dispatch({ type: POST_REQUEST })
    const project = await API_createNewProject(data)
    dispatch({ type: CREATE_PROJECT_SUCCESS, payload: project })
  } catch (e) {
    console.log(e)
    dispatch({ type: POST_FAILED, payload: extractErrorMessage(e) })
  }
}

export const updateStaus = (projectId, data) => async dispatch => {
  try {
    dispatch({ type: POST_REQUEST, payload: projectId })
    const updated = await API_updateStatus(projectId, { status: data })
    dispatch({
      type: UPDATE_STATUS_SUCCESS,
      payload: { id: projectId, status: updated.status }
    })
  } catch (e) {
    console.log(e)
    dispatch(reset('status'))
    dispatch({
      type: POST_FAILED,
      payload: extractErrorMessage(e)
    })
  }
}

export const updateIncomesAndExpenses = (projectId, data) => async dispatch => {
  try {
    dispatch({ type: POST_REQUEST })
    const { incomes, expenses, generalInfo } = await API_updateProject(
      projectId,
      data
    )

    dispatch({
      type: UPDATE_PROJECT_SUCCESS,
      payload: {
        id: projectId,
        ...(incomes && { incomes }),
        ...(expenses && { expenses }),
        ...(generalInfo && { generalInfo })
      }
    })
  } catch (e) {
    console.log(e)
    dispatch({
      type: POST_FAILED,
      payload: extractErrorMessage(e)
    })
  }
}

export const sortProjectByDate = type => {
  return { type: SORT_BY_INVOICE_DATE, payload: type }
}

const reducer = (state = new Projects(), { type, payload } = {}) => {
  switch (type) {
    case FETCH_ENTITIES_SUCCESS:
      return state.setProjects(payload)

    case FETCH_REQUESET:
      return state.fetchRequest()
    case FETCH_FAILED:
      return state.fetchFail(payload)
    case FETCH_SINGLE_SUCCESS:
      return state.successSingleProject(payload)

    case POST_REQUEST:
      return state.postRequest(payload)
    case POST_FAILED:
      return state.postFail(payload)

    case CREATE_PROJECT_SUCCESS:
      return state.successCreatePost(payload)
    case UPDATE_STATUS_SUCCESS:
      return state.successUpdateStatus(payload)
    case UPDATE_PROJECT_SUCCESS:
      return state.updateProject(payload)

    case SORT_BY_INVOICE_DATE:
      return state.sortProjectByDate(payload)

    default:
      return state
  }
}

export default reducer
