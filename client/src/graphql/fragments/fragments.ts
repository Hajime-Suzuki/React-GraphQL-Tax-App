import gql from 'graphql-tag'

const CLIENT_FRAGMENT = gql`
  fragment ClientFragment on Client {
    id
    firstName
    lastName
    email
    phone
  }
`

const PRICE_FRAGMENT = gql`
  fragment PriceFragment on ExpenseAndIncome {
    price
    quantity
    taxRate
  }
`

const BASIC_INFO_FRAGMENT = gql`
  fragment BasicInfoFragment on Project {
    id
    name
    projectDate
    invoiceDate
    status
  }
`

export const Fragments = {
  CLIENT_FRAGMENT,
  PRICE_FRAGMENT,
  BASIC_INFO_FRAGMENT
}
