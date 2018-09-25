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
  getProjects() {
    const projects = this.data
    const [...values] = projects.values()
    return values
  }

  fetchItem() {
    return this.withMutations(s => {
      s.setIn(['_status', 'fetching'], true).setIn(['_status', 'message'], null)
    })
  }
  fetchFail(message) {
    return this.withMutations(s => {
      s.setIn(['_status', 'fetching'], false).setIn(
        ['_status', 'message'],
        message
      )
    })
  }

  postItem(projectId) {
    return this.withMutations(s => {
      s.setIn(['_status', 'posting'], projectId || true).setIn(
        ['_status', 'message'],
        null
      )
    })
  }
  postFail(message) {
    return this.withMutations(s => {
      s.setIn(['_status', 'posting'], false).setIn(
        ['_status', 'message'],
        message
      )
    })
  }

  successSingleProject(data) {
    return this.withMutations(s => {
      s.setIn(['_status', 'fetching'], false)
        .setIn(['_status', 'message'], null)
        .mergeIn(['data'], fromJS({ [data.id]: data }))
    })
  }

  successCreatePost(data) {
    return this.withMutations(s => {
      s.setIn(['_status', 'posting'], false)
        .setIn(['_status', 'message'], null)
        .mergeIn(['data'], fromJS({ [data.id]: data }))
    })
  }

  successUpdateStatus({ id, status }) {
    return this.withMutations(s => {
      s.setIn(['_status', 'posting'], false)
        .setIn(['_status', 'message'], null)
        .setIn(['data', id, 'status'], status)
    })
  }
}
