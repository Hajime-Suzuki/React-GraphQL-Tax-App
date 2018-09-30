import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
// import { combineReducers } from 'redux-immutable'
import entities from './entities'
import user from './user'

export default combineReducers({
  entities,
  user,
  form: formReducer
})
