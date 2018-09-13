import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import projects from './projects/projects'

export default combineReducers({
  projects,
  form: formReducer
})
