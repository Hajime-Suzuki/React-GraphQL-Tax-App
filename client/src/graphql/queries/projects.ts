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
