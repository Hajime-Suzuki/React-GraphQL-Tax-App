import gql from 'graphql-tag'

export const GET_PROJECT_OVERVIEW = gql`
  query getProjectOverview($userId: String!) {
    getProjectsByUserId(userId: $userId) {
      id
      name
      date
      invoiceDate
      incomes {
        price
        quantity
      }
      status
    }
  }
`

export const GET_SINGLE_PROJECT = gql`
  query getSingleProject($id: String!) {
    getSingleProject(projectId: $id) {
      id
      invoiceNumber
      invoiceDate
      name
      date
      streetAddress
      city
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
    }
  }
`

export const UPDATE_STATUS = gql`
  mutation updateStatus($projectId: String!, $data: UpdateProjectInput!) {
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

export const ADD_PROJECT = gql`
  mutation addProject($data: AddProjectInput!) {
    addProject(data: $data) {
      success
      message
      project {
        id
        status
      }
    }
  }
`
