import { Record, fromJS } from 'immutable'

const initalState = {
  user: null
}

class User extends Record(initalState) {
  // constructor() {
  //   super()
  //   this.test = 1324
  // }
  setUser(data) {
    return this.set('user', fromJS(data.entities.user))
  }
  test() {
    // this.user.get('5b9bbb1fb048de0758baf461').forEach(v => {
    //   console.log(v)
    // })
    const [...keys] = this.user.keys()
    console.log(keys[0])

    // console.log()

    return this.user.setIn(
      ['5b9bbb1fb048de0758baf461', 'firstName'],
      'ashtashtasht'
    )
  }
}

export default User
