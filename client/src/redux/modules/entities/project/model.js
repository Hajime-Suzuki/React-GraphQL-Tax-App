import { Record, fromJS, Map, List } from 'immutable'
import { format } from 'date-fns'

class Project extends Record(initialProjectData) {}

const initialState = {
  _status: {
    fetching: false,
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
  setSingleProject(data) {
    return this.mergeIn(['data'], fromJS({ [data.id]: data }))
  }
  getProjects() {
    const projects = this.data
    const [...values] = projects.values()
    return values
  }
}
