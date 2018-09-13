import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import projects from './projects/projects'
import user from './user/user'
import singupLogin from './signupLogin/singupLogin'

export default combineReducers({
  projects,
  user,
  signup_login: singupLogin,
  form: formReducer
})
