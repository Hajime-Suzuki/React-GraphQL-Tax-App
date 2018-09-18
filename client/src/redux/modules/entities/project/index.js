import { FETCH_ENTITIES_SUCCESS } from '..'
import { Projects } from './model'

const reducer = (state = new Projects(), { type, payload } = {}) => {
  switch (type) {
    case FETCH_ENTITIES_SUCCESS:
      return state.setProjects(payload)
    case 'test':
      return state.test()
    default:
      return state
  }
}

export default reducer
