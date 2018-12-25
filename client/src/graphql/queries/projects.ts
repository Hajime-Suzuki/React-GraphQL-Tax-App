import gql from 'graphql-tag'

const GET_PROJECT_OVERVIEW = gql`
  query getProjectOverview($userId: String!) {
    getProjectsByUserId(userId: $userId) {
      id
      name
      date
      invoiceDate
      status
      incomes {
        price
        quantity
      }
    }
  }
`

const GET_SINGLE_PROJECT = gql`
  query getSingleProject($id: String!) {
    getSingleProject(projectId: $id) {
      id
      invoiceNumber
      invoiceDate
      name
      date
      status
      client {
        firstName
        lastName
        email
        phone
      }
      incomes {
        name
        price
        quantity
        taxRate
      }
      expenses {
        name
        price
        quantity
        taxRate
      }
    }
  }
`

const UPDATE_STATUS = gql`
  mutation updateStatus($projectId: String!, $data: ProjectInput!) {
    updateProject(projectId: $projectId, data: $data) {
      success
      message
      project {
        id
        status
      }
    }
  }
`

const ADD_PROJECT = gql`
  mutation addProject($data: ProjectInput!) {
    addProject(data: $data) {
      success
      message
      project {
        id
        invoiceNumber
        invoiceDate
        name
        date
        status
        client {
          firstName
          lastName
          email
          phone
        }
        incomes {
          name
          price
          quantity
          taxRate
        }
        expenses {
          name
          price
          quantity
          taxRate
        }
      }
    }
  }
`

const UPDATE_INCOMES_EXPENSES = gql`
  mutation updateIncomesAndExpenses($projectId: String!, $data: ProjectInput!) {
    updateProject(projectId: $projectId, data: $data) {
      success
      message
      project {
        id
        incomes {
          name
          price
          quantity
          taxRate
        }
        expenses {
          name
          price
          quantity
          taxRate
        }
      }
    }
  }
`

const UPDATE_BASIC_INFO = gql`
  mutation updateBasicInfo($projectId: String!, $data: ProjectInput!) {
    updateProject(projectId: $projectId, data: $data) {
      success
      message
      project {
        id
        invoiceNumber
        invoiceDate
        name
        date
        status
        client {
          firstName
          lastName
          email
          phone
        }
      }
    }
  }
`

export const projectQueries = {
  GET_PROJECT_OVERVIEW,
  GET_SINGLE_PROJECT,
  UPDATE_STATUS,
  ADD_PROJECT,
  UPDATE_INCOMES_EXPENSES,
  UPDATE_BASIC_INFO
}
