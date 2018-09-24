import { format } from 'date-fns'
import { fromJS, Map, Record, OrderedMap } from 'immutable'

const initialState = {
  _status: {
    fetching: false,
    posting: false,
    message: null
  },
  data: Map({})
}

export class Projects extends Record(initialState) {
  setProjects(data) {
    const { projects } = data.entities

    const immutableProjects = Object.keys(projects).reduce((obj, id) => {
      const { date } = projects[id]
      projects[id].date = date && format(date, 'YYYY-MM-DD')

      return {
        ...obj,
        [id]: Map(projects[id])
      }
    }, {})

    return this.withMutations(s => {
      s.set('data', OrderedMap(immutableProjects)).setIn(
        ['_status', 'fetching'],
        false
      )
    })
  }

  fetchSingleProject() {
    return this.withMutations(s => {
      s.setIn(['_status', 'fetching'], true).setIn(['_status', 'message'], null)
    })
  }
  failSingleProject(message) {
    return this.withMutations(s => {
      s.setIn(['_status', 'fetching'], false).setIn(
        ['_status', 'message'],
        message
      )
    })
  }

  requestCreatePost() {
    return this.withMutations(s => {
      s.setIn(['_status', 'posting'], true).setIn(['_status', 'message'], null)
    })
  }
  failCreatePost(message) {
    return this.withMutations(s => {
      s.setIn(['_status', 'posting'], false).setIn(
        ['_status', 'message'],
        message
      )
    })
  }
  successCreatePost(data) {
    return this.withMutations(s => {
      s.setIn(['_status', 'posting'], false)
        .setIn(['_status', 'message'], null)
        .mergeIn(['data'], fromJS({ [data.id]: data }))
    })
  }

  // need to refactor. make api request method and turn fetching and posting into logind.

  updateStatusRequest() {
    return this.withMutations(s => {
      s.setIn(['_status', 'posting'], true).setIn(['_status', 'message'], null)
    })
  }

  updateStatusSuccess({ id, status }) {
    return this.withMutations(s => {
      s.setIn(['_status', 'posting'], false)
        .setIn(['_status', 'message'], null)
        .setIn(['data', id, 'status'], status)
    })
  }

  setSingleProject(data) {
    return this.withMutations(s => {
      s.mergeIn(['data'], fromJS({ [data.id]: data }))
        .setIn(['_status', 'fetching'], false)
        .setIn(['_status', 'message'], null)
    })
  }
  getProjects() {
    const projects = this.data
    const [...values] = projects.values()
    return values
  }
}
