import { Record } from 'immutable'
import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux'
// import { combineReducers } from 'redux-immutable'
import user, { User } from './user/user'
import signupLogin from './signupLogin/signupLogin'

export default combineReducers(
  {
    // projects,
    // userId,
    // data,
    user,
    // signupLogin,
    form: formReducer
    // test: testReducer
  }
  // Record({
  //   user: new User(),
  //   form: formReducer
  // })
)
