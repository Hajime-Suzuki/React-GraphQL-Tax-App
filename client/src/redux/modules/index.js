import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import projects from './projects/projects'
import userId from './user/user'
import singupLogin from './signupLogin/singupLogin'

export default combineReducers({
  projects,
  userId,
  signup_login: singupLogin,
  form: formReducer
})
