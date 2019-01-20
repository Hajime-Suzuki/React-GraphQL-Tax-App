import gql from 'graphql-tag'
import { Fragments } from '../fragments/fragments'

const GET_PROJECT_OVERVIEW = gql`
  query getProjectOverview($userId: String!) {
    projects: getProjectsByUserId(userId: $userId) {
      ...BasicInfoFragment
      incomes {
        ...PriceFragment
      }
    }
  }
  ${Fragments.PRICE_FRAGMENT}
  ${Fragments.BASIC_INFO_FRAGMENT}
`

const GET_SINGLE_PROJECT = gql`
  query getSingleProject($id: String!) {
    project: getSingleProject(projectId: $id) {
      invoiceNumber
      ...BasicInfoFragment

      incomes {
        name
        ...PriceFragment
      }
      expenses {
        name
        ...PriceFragment
      }
    }
    client: getClientByProject(projectId: $id) {
      ...ClientFragment
      streetAddress
      postalCode
      city
    }
  }

  ${Fragments.PRICE_FRAGMENT}
  ${Fragments.BASIC_INFO_FRAGMENT}
  ${Fragments.CLIENT_FRAGMENT}
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
        ...BasicInfoFragment

        incomes {
          name
          ...PriceFragment
        }
        expenses {
          name
          ...PriceFragment
        }
      }
    }
  }
  ${Fragments.PRICE_FRAGMENT}
  ${Fragments.BASIC_INFO_FRAGMENT}
  ${Fragments.CLIENT_FRAGMENT}
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
          ...PriceFragment
        }
        expenses {
          name
          ...PriceFragment
        }
      }
    }
  }
  ${Fragments.PRICE_FRAGMENT}
`

const UPDATE_BASIC_INFO = gql`
  mutation updateBasicInfo($projectId: String!, $data: ProjectInput!) {
    updateProject(projectId: $projectId, data: $data) {
      success
      message
      project {
        invoiceNumber
        ...BasicInfoFragment
      }
    }
  }
  ${Fragments.BASIC_INFO_FRAGMENT}
`

const DELETE_PROJECT = gql`
  mutation deleteProject($projectId: String!) {
    deleteProject(projectId: $projectId) {
      message
      project {
        id
      }
    }
  }
  ${Fragments.BASIC_INFO_FRAGMENT}
`

const GENERATE_INVOICE = gql`
  mutation downloadInvoice($projectId: String!) {
    downloadInvoice(projectId: $projectId) {
      message
      data
    }
  }
`

export const projectQueries = {
  GET_PROJECT_OVERVIEW,
  GET_SINGLE_PROJECT,
  UPDATE_STATUS,
  ADD_PROJECT,
  UPDATE_INCOMES_EXPENSES,
  UPDATE_BASIC_INFO,
  DELETE_PROJECT,
  GENERATE_INVOICE
}
