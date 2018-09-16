import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
// import { combineReducers } from 'redux-immutable'
import user from './user'

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
