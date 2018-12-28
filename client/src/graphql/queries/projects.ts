import gql from 'graphql-tag'

const PRICE_FRAGMENTS = gql`
  fragment PriceFragments on ExpenseAndIncome {
    price
    quantity
    taxRate
  }
`

const BASIC_INFO_FRAGMENTS = gql`
  fragment BasicInfoFragments on Project {
    id
    name
    projectDate
    invoiceDate
    status
  }
`

const GET_PROJECT_OVERVIEW = gql`
  query getProjectOverview($userId: String!) {
    getProjectsByUserId(userId: $userId) {
      ...BasicInfoFragments
      incomes {
        ...PriceFragments
      }
    }
  }
  ${PRICE_FRAGMENTS}
  ${BASIC_INFO_FRAGMENTS}
`

const GET_SINGLE_PROJECT = gql`
  query getSingleProject($id: String!) {
    getSingleProject(projectId: $id) {
      invoiceNumber
      ...BasicInfoFragments
      client {
        firstName
        lastName
        email
        phone
      }
      incomes {
        name
        ...PriceFragments
      }
      expenses {
        name
        ...PriceFragments
      }
    }
  }
  ${PRICE_FRAGMENTS}
  ${BASIC_INFO_FRAGMENTS}
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
        invoiceNumber
        ...BasicInfoFragments
        client {
          firstName
          lastName
          email
          phone
        }
        incomes {
          name
          ...PriceFragments
        }
        expenses {
          name
          ...PriceFragments
        }
      }
    }
  }
  ${PRICE_FRAGMENTS}
  ${BASIC_INFO_FRAGMENTS}
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
          ...PriceFragments
        }
        expenses {
          name
          ...PriceFragments
        }
      }
    }
  }
  ${PRICE_FRAGMENTS}
`

const UPDATE_BASIC_INFO = gql`
  mutation updateBasicInfo($projectId: String!, $data: ProjectInput!) {
    updateProject(projectId: $projectId, data: $data) {
      success
      message
      project {
        invoiceNumber
        ...BasicInfoFragments
        client {
          firstName
          lastName
          email
          phone
        }
      }
    }
  }
  ${BASIC_INFO_FRAGMENTS}
`

const DELETE_PROJECT = gql`
  mutation deleteProject($projectId: String!) {
    deleteProject(projectId: $projectId) {
      message
      project {
        invoiceNumber
        ...BasicInfoFragments
        client {
          firstName
          lastName
          email
          phone
        }
      }
    }
  }
  ${BASIC_INFO_FRAGMENTS}
`

export const projectQueries = {
  GET_PROJECT_OVERVIEW,
  GET_SINGLE_PROJECT,
  UPDATE_STATUS,
  ADD_PROJECT,
  UPDATE_INCOMES_EXPENSES,
  UPDATE_BASIC_INFO,
  DELETE_PROJECT
}

export const projectFragments = {
  PRICE_FRAGMENTS,
  BASIC_INFO_FRAGMENTS
}
