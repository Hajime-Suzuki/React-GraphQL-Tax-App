import { Record } from 'immutable'
import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux-immutable'
import user, { User } from './user/user'

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
