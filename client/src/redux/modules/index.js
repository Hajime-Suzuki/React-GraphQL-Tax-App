import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux-immutable'
import data from './data/data'
import projects from './projects/projects'
import singupLogin from './signupLogin/singupLogin'
import user from './user/user'
import userId from './userId/userId'

export default combineReducers({
  projects,
  userId,
  data,
  user,
  signup_login: singupLogin,
  form: formReducer
  // test: testReducer
})
