import { FETCH_ENTITIES_SUCCESS } from '..'
import User from './model'

export const usertest = () => ({ type: 'usertest' })

const userReducer = (
  state = new User(),
  { type, payload }: { type?: any; payload?: any } = {}
) => {
  switch (type) {
    case FETCH_ENTITIES_SUCCESS:
      return state.setUser(payload)

    default:
      return state
  }
}

export default userReducer
