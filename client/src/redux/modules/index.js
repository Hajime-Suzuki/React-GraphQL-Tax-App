import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux-immutable'
import data from './data/data'
import projects from './projects/projects'
import singupLogin from './signupLogin/singupLogin'
import user, { User } from './user/user'
import { Map, Record } from 'immutable'

export default combineReducers(
  {
    // projects,
    // userId,
    // data,
    user,
    // signup_login: singupLogin,
    form: formReducer
    // test: testReducer
  },
  Record({
    user: new User(),
    form: formReducer
  })
)
