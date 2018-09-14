import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import projects from './projects/projects'
import userId from './userId/userId'
import data from './data/data'
import singupLogin from './signupLogin/singupLogin'

export default combineReducers({
  projects,
  userId,
  data,
  signup_login: singupLogin,
  form: formReducer
})
