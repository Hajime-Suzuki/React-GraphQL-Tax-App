import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import projects from './projects/projects'
import login from './login/login'

export default combineReducers({
  projects,
  login,
  form: formReducer
})
