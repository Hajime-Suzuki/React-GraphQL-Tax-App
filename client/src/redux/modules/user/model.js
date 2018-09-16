import { Record } from 'immutable'
import PropTypes from 'prop-types'
import { decodeJwt } from '../../../libs/jwt'
import { createSelector } from 'reselect'

const token = localStorage.getItem('jwt')
const userId = token ? decodeJwt(token).id : null

// const userSelector = state => state.user

const initialState = {
  userId,
  _status: {
    fetching: false,
    message: null
  }
}

class User extends Record(initialState) {
  getId() {
    return this.userId
  }
  getStatus() {
    return this._status
  }
  loginSignupRequest() {
    return this.withMutations(s => {
      s.setIn(['_status', 'fetching'], true).setIn(['_status', 'message'], null)
    })
  }

  loginSignupSuccess(userId) {
    return this.withMutations(s => {
      s.set('userId', userId)
        .setIn(['_status', 'fetching'], false)
        .setIn(['_status', 'message'], null)
    })
  }
  loginSignupFailed(message) {
    return this.withMutations(s => {
      s.setIn(['_status', 'fetching'], false).setIn(
        ['_status', 'message'],
        message
      )
    })
  }
  logout() {
    return this.set('userId', null)
  }
}

export default User

export const userStatusType = PropTypes.shape({
  fetching: PropTypes.bool,
  message: PropTypes.string
})
