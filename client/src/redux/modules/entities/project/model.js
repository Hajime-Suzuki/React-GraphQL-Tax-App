import { Record, fromJS, Map, List } from 'immutable'
import { format } from 'date-fns'

class Project extends Record(initialProjectData) {}

const initialState = {
  _status: {
    fetching: false,
    posting: false,
    message: null
  },
  data: Map({})
}

const initialProjectData = {
  id: null,
  name: null,
  rowPrice: null,
  status: null,
  taxRate: null
}

export class Projects extends Record(initialState) {
  setProjects(data) {
    const { projects } = data.entities
    Object.values(projects).forEach(d => {
      d.date = format(d.date, 'YYYY-MM-DD')
    })
    return this.withMutations(s => {
      s.set('data', fromJS(projects)).setIn(['_status', 'fetching'], false)
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
