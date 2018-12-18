import { startOfQuarter } from 'date-fns'
import { fromJS, Map, OrderedMap, Record } from 'immutable'

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
    if (!projects) return this

    const immutableProjects = Object.keys(projects).reduce((obj, id) => {
      return {
        ...obj,
        [id]: fromJS(projects[id])
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

  getCurrentPeriodProjects() {
    const today = new Date()
    const currentPeriodStartDate = startOfQuarter(today)
    return this.data.filter(
      (p: any) => new Date(p.get('invoiceDate')) >= currentPeriodStartDate
    )
  }

  sortProjectByDate(type) {
    return this.withMutations(s => {
      const sortedProject = s.data.sort((a: any, b: any) => {
        if (!!a.get(type) && !b.get(type)) {
          return -1
        }
        if (!!b.get(type) && !a.get(type)) {
          return 1
        }

        const diff =
          Number(new Date(b.get(type))) - Number(new Date(a.get(type)))
        return diff
      })
      s.set('data', sortedProject)
    })
  }

  fetchRequest() {
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

  postRequest(projectId) {
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

  updateProject({ id, incomes, expenses, generalInfo }) {
    return this.withMutations(s => {
      s.setIn(['_status', 'posting'], false).setIn(['_status', 'message'], null)

      if (incomes) {
        s.setIn(['data', id, 'incomes'], fromJS(incomes))
      }

      if (expenses) {
        s.setIn(['data', id, 'expenses'], fromJS(expenses))
      }

      if (generalInfo) {
        s.mergeIn(['data', id], fromJS(generalInfo))

        const sortedProject = s.data.sort((a: any, b: any) => {
          return (
            Number(new Date(b.get('date'))) - Number(new Date(a.get('date')))
          )
        })

        s.set('data', sortedProject)
      }
    })
  }
}