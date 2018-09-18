import { Record, fromJS, Map, List } from 'immutable'

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
    const keys = Object.keys(data.entities.projects)
    const projects = Object.values(data.entities.projects)
    const id = projects[0].id
    const b = fromJS(data.entities.projects)
    return this.set('data', b)
  }

  getProjects() {
    const projects = this.data
    const [...values] = projects.values()
    values.forEach(v => console.log(v.get('name')))
    return values
  }
}
