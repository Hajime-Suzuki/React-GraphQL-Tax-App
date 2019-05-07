export type Maybe<T> = T | null | undefined
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
  Blob: any
}

export interface AddGeneralExpensesResponse {
  message?: Maybe<Scalars['String']>
  generalExpense?: Maybe<GeneralExpense>
}

export interface Client {
  id: Scalars['String']
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  user?: Maybe<Scalars['String']>
  projects?: Maybe<Array<Scalars['String']>>
  streetAddress?: Maybe<Scalars['String']>
  postalCode?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
}

export interface ClientInput {
  id?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  streetAddress?: Maybe<Scalars['String']>
  postalCode?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
}

export interface ClientMutationResponse {
  message?: Maybe<Scalars['String']>
  client?: Maybe<Client>
}

export interface ExpenseAndIncome {
  name?: Maybe<Scalars['String']>
  price?: Maybe<Scalars['String']>
  quantity?: Maybe<Scalars['Int']>
  taxRate?: Maybe<Scalars['Int']>
}

export interface ExpenseAndIncomeInput {
  name?: Maybe<Scalars['String']>
  price?: Maybe<Scalars['String']>
  quantity?: Maybe<Scalars['Int']>
  taxRate?: Maybe<Scalars['Int']>
}

export interface GeneralExpense {
  name: Scalars['String']
  price: Scalars['String']
  quantity: Scalars['Int']
  taxRate: Scalars['Int']
  date: Scalars['String']
  user: Scalars['String']
}

export interface GeneralExpenseInput {
  name: Scalars['String']
  price: Scalars['String']
  quantity: Scalars['Int']
  taxRate: Scalars['Int']
  date: Scalars['String']
}

export interface GenerateInvoiceResponse {
  message?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['Blob']>
}

export enum Invoice_Status {
  None = 'none',
  Invoice = 'invoice',
  Paid = 'paid'
}

export interface Mutation {
  registerUser: RegisterResponse
  loginUser: RegisterResponse
  updateUser: UpdateUserResponse
  changePassword: RegisterResponse
  updateProject: MutationProjectResponse
  addProject?: Maybe<MutationProjectResponse>
  deleteProject?: Maybe<MutationProjectResponse>
  addGeneralExpense: AddGeneralExpensesResponse
  addClient?: Maybe<ClientMutationResponse>
  updateClient?: Maybe<ClientMutationResponse>
  updateClientProject?: Maybe<ClientMutationResponse>
  removeClientFromProject?: Maybe<ClientMutationResponse>
  deleteClient?: Maybe<ClientMutationResponse>
  downloadInvoice?: Maybe<GenerateInvoiceResponse>
}

export interface MutationRegisterUserArgs {
  firstName: Scalars['String']
  lastName: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
}

export interface MutationLoginUserArgs {
  email: Scalars['String']
  password: Scalars['String']
}

export interface MutationUpdateUserArgs {
  data: UpdateUserInput
}

export interface MutationChangePasswordArgs {
  email: Scalars['String']
  password: Scalars['String']
}

export interface MutationUpdateProjectArgs {
  projectId: Scalars['String']
  data: ProjectInput
}

export interface MutationAddProjectArgs {
  data: ProjectInput
}

export interface MutationDeleteProjectArgs {
  projectId: Scalars['String']
}

export interface MutationAddGeneralExpenseArgs {
  data: GeneralExpenseInput
}

export interface MutationAddClientArgs {
  data: ClientInput
}

export interface MutationUpdateClientArgs {
  clientId: Scalars['String']
  data: ClientInput
}

export interface MutationUpdateClientProjectArgs {
  projectId: Scalars['String']
  clientId: Scalars['String']
}

export interface MutationRemoveClientFromProjectArgs {
  projectId: Scalars['String']
  clientId: Scalars['String']
}

export interface MutationDeleteClientArgs {
  clientId: Scalars['String']
}

export interface MutationDownloadInvoiceArgs {
  projectId: Scalars['String']
}

export interface MutationProjectResponse {
  success: Scalars['Boolean']
  message?: Maybe<Scalars['String']>
  project: Project
  client?: Maybe<Client>
}

export interface Project {
  id: Scalars['String']
  invoiceNumber: Scalars['String']
  invoiceDate?: Maybe<Scalars['Date']>
  name: Scalars['String']
  projectDate?: Maybe<Scalars['Date']>
  streetAddress?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  link?: Maybe<Scalars['String']>
  status: Invoice_Status
  user: Scalars['String']
  expenses?: Maybe<Array<ExpenseAndIncome>>
  incomes?: Maybe<Array<ExpenseAndIncome>>
}

export interface ProjectInput {
  invoiceNumber?: Maybe<Scalars['String']>
  invoiceDate?: Maybe<Scalars['String']>
  projectDate?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  date?: Maybe<Scalars['String']>
  status?: Maybe<Invoice_Status>
  client?: Maybe<ClientInput>
  expenses?: Maybe<Array<ExpenseAndIncomeInput>>
  incomes?: Maybe<Array<ExpenseAndIncomeInput>>
}

export interface Query {
  getUser: User
  getProjectsByUserId: Array<Project>
  getSingleProject?: Maybe<Project>
  getGeneralExpenses?: Maybe<Array<GeneralExpense>>
  getClientsByUser?: Maybe<Array<Client>>
  getClientByProject?: Maybe<Client>
  getSingleClient?: Maybe<Client>
  health?: Maybe<Scalars['String']>
}

export interface QueryGetProjectsByUserIdArgs {
  userId: Scalars['String']
}

export interface QueryGetSingleProjectArgs {
  projectId: Scalars['String']
}

export interface QueryGetClientByProjectArgs {
  projectId: Scalars['String']
}

export interface QueryGetSingleClientArgs {
  clientId: Scalars['String']
}

export interface RegisterResponse {
  success: Scalars['Boolean']
  message?: Maybe<Scalars['String']>
  token: Scalars['String']
}

export interface UpdateUserInput {
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  btw?: Maybe<Scalars['String']>
  kvk?: Maybe<Scalars['String']>
  iban?: Maybe<Scalars['String']>
  streetAddress?: Maybe<Scalars['String']>
  postalCode?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
}

export interface UpdateUserResponse {
  message?: Maybe<Scalars['String']>
  user: User
}

export interface User {
  id: Scalars['ID']
  firstName: Scalars['String']
  lastName: Scalars['String']
  email: Scalars['String']
  projects?: Maybe<Array<Project>>
  expenses?: Maybe<Array<GeneralExpense>>
  clients?: Maybe<Array<Client>>
  btw?: Maybe<Scalars['String']>
  kvk?: Maybe<Scalars['String']>
  iban?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  streetAddress?: Maybe<Scalars['String']>
  postalCode?: Maybe<Scalars['String']>
  city?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['Date']>
  updatedAt?: Maybe<Scalars['Date']>
}
export interface GetProjectOverviewQueryVariables {
  userId: Scalars['String']
}

export type GetProjectOverviewQuery = { __typename?: 'Query' } & {
  projects: Array<
    { __typename?: 'Project' } & {
      incomes: Maybe<
        Array<{ __typename?: 'ExpenseAndIncome' } & PriceFragmentFragment>
      >
      expenses: Maybe<
        Array<{ __typename?: 'ExpenseAndIncome' } & PriceFragmentFragment>
      >
    } & BasicInfoFragmentFragment
  >
}

export interface GetSingleProjectQueryVariables {
  id: Scalars['String']
}

export type GetSingleProjectQuery = { __typename?: 'Query' } & {
  project: Maybe<
    { __typename?: 'Project' } & Pick<Project, 'invoiceNumber'> & {
        incomes: Maybe<
          Array<
            { __typename?: 'ExpenseAndIncome' } & Pick<
              ExpenseAndIncome,
              'name'
            > &
              PriceFragmentFragment
          >
        >
        expenses: Maybe<
          Array<
            { __typename?: 'ExpenseAndIncome' } & Pick<
              ExpenseAndIncome,
              'name'
            > &
              PriceFragmentFragment
          >
        >
      } & BasicInfoFragmentFragment
  >
  client: Maybe<
    { __typename?: 'Client' } & Pick<
      Client,
      'streetAddress' | 'postalCode' | 'city'
    > &
      ClientFragmentFragment
  >
}

export interface UpdateStatusMutationVariables {
  projectId: Scalars['String']
  data: ProjectInput
}

export type UpdateStatusMutation = { __typename?: 'Mutation' } & {
  updateProject: { __typename?: 'MutationProjectResponse' } & Pick<
    MutationProjectResponse,
    'success' | 'message'
  > & { project: { __typename?: 'Project' } & Pick<Project, 'id' | 'status'> }
}

export interface AddProjectMutationVariables {
  data: ProjectInput
}

export type AddProjectMutation = { __typename?: 'Mutation' } & {
  addProject: Maybe<
    { __typename?: 'MutationProjectResponse' } & Pick<
      MutationProjectResponse,
      'success' | 'message'
    > & {
        project: { __typename?: 'Project' } & Pick<Project, 'invoiceNumber'> & {
            incomes: Maybe<
              Array<
                { __typename?: 'ExpenseAndIncome' } & Pick<
                  ExpenseAndIncome,
                  'name'
                > &
                  PriceFragmentFragment
              >
            >
            expenses: Maybe<
              Array<
                { __typename?: 'ExpenseAndIncome' } & Pick<
                  ExpenseAndIncome,
                  'name'
                > &
                  PriceFragmentFragment
              >
            >
          } & BasicInfoFragmentFragment
        client: Maybe<{ __typename?: 'Client' } & ClientFragmentFragment>
      }
  >
}

export interface UpdateIncomesAndExpensesMutationVariables {
  projectId: Scalars['String']
  data: ProjectInput
}

export type UpdateIncomesAndExpensesMutation = { __typename?: 'Mutation' } & {
  updateProject: { __typename?: 'MutationProjectResponse' } & Pick<
    MutationProjectResponse,
    'success' | 'message'
  > & {
      project: { __typename?: 'Project' } & Pick<Project, 'id'> & {
          incomes: Maybe<
            Array<
              { __typename?: 'ExpenseAndIncome' } & Pick<
                ExpenseAndIncome,
                'name'
              > &
                PriceFragmentFragment
            >
          >
          expenses: Maybe<
            Array<
              { __typename?: 'ExpenseAndIncome' } & Pick<
                ExpenseAndIncome,
                'name'
              > &
                PriceFragmentFragment
            >
          >
        }
    }
}

export interface UpdateBasicInfoMutationVariables {
  projectId: Scalars['String']
  data: ProjectInput
}

export type UpdateBasicInfoMutation = { __typename?: 'Mutation' } & {
  updateProject: { __typename?: 'MutationProjectResponse' } & Pick<
    MutationProjectResponse,
    'success' | 'message'
  > & {
      project: { __typename?: 'Project' } & Pick<Project, 'invoiceNumber'> &
        BasicInfoFragmentFragment
    }
}

export interface DeleteProjectMutationVariables {
  projectId: Scalars['String']
}

export type DeleteProjectMutation = { __typename?: 'Mutation' } & {
  deleteProject: Maybe<
    { __typename?: 'MutationProjectResponse' } & Pick<
      MutationProjectResponse,
      'message'
    > & { project: { __typename?: 'Project' } & Pick<Project, 'id'> }
  >
}

export interface DownloadInvoiceMutationVariables {
  projectId: Scalars['String']
}

export type DownloadInvoiceMutation = { __typename?: 'Mutation' } & {
  downloadInvoice: Maybe<
    { __typename?: 'GenerateInvoiceResponse' } & Pick<
      GenerateInvoiceResponse,
      'message' | 'data'
    >
  >
}

export type ClientFragmentFragment = { __typename?: 'Client' } & Pick<
  Client,
  'id' | 'firstName' | 'lastName' | 'email' | 'phone'
>

export type PriceFragmentFragment = { __typename?: 'ExpenseAndIncome' } & Pick<
  ExpenseAndIncome,
  'price' | 'quantity' | 'taxRate'
>

export type BasicInfoFragmentFragment = { __typename?: 'Project' } & Pick<
  Project,
  'id' | 'name' | 'projectDate' | 'invoiceDate' | 'status'
>

import gql from 'graphql-tag'
import * as React from 'react'
import * as ReactApollo from 'react-apollo'
import * as ReactApolloHooks from 'react-apollo-hooks'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export const ClientFragmentFragmentDoc = gql`
  fragment ClientFragment on Client {
    id
    firstName
    lastName
    email
    phone
  }
`
export const PriceFragmentFragmentDoc = gql`
  fragment PriceFragment on ExpenseAndIncome {
    price
    quantity
    taxRate
  }
`
export const BasicInfoFragmentFragmentDoc = gql`
  fragment BasicInfoFragment on Project {
    id
    name
    projectDate
    invoiceDate
    status
  }
`
export const GetProjectOverviewDocument = gql`
  query getProjectOverview($userId: String!) {
    projects: getProjectsByUserId(userId: $userId) {
      ...BasicInfoFragment
      incomes {
        ...PriceFragment
      }
      expenses {
        ...PriceFragment
      }
    }
  }
  ${BasicInfoFragmentFragmentDoc}
  ${PriceFragmentFragmentDoc}
`

export const GetProjectOverviewComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<
        GetProjectOverviewQuery,
        GetProjectOverviewQueryVariables
      >,
      'query'
    >,
    'variables'
  > & { variables: GetProjectOverviewQueryVariables }
) => (
  <ReactApollo.Query<GetProjectOverviewQuery, GetProjectOverviewQueryVariables>
    query={GetProjectOverviewDocument}
    {...props}
  />
)

export type GetProjectOverviewProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<
    GetProjectOverviewQuery,
    GetProjectOverviewQueryVariables
  >
> &
  TChildProps
export function withGetProjectOverview<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    GetProjectOverviewQuery,
    GetProjectOverviewQueryVariables,
    GetProjectOverviewProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    GetProjectOverviewQuery,
    GetProjectOverviewQueryVariables,
    GetProjectOverviewProps<TChildProps>
  >(GetProjectOverviewDocument, {
    alias: 'withGetProjectOverview',
    ...operationOptions
  })
}

export function useGetProjectOverviewQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<
    GetProjectOverviewQueryVariables
  >
) {
  return ReactApolloHooks.useQuery<
    GetProjectOverviewQuery,
    GetProjectOverviewQueryVariables
  >(GetProjectOverviewDocument, baseOptions)
}
export const GetSingleProjectDocument = gql`
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
  ${BasicInfoFragmentFragmentDoc}
  ${PriceFragmentFragmentDoc}
  ${ClientFragmentFragmentDoc}
`

export const GetSingleProjectComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<
        GetSingleProjectQuery,
        GetSingleProjectQueryVariables
      >,
      'query'
    >,
    'variables'
  > & { variables: GetSingleProjectQueryVariables }
) => (
  <ReactApollo.Query<GetSingleProjectQuery, GetSingleProjectQueryVariables>
    query={GetSingleProjectDocument}
    {...props}
  />
)

export type GetSingleProjectProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetSingleProjectQuery, GetSingleProjectQueryVariables>
> &
  TChildProps
export function withGetSingleProject<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    GetSingleProjectQuery,
    GetSingleProjectQueryVariables,
    GetSingleProjectProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    GetSingleProjectQuery,
    GetSingleProjectQueryVariables,
    GetSingleProjectProps<TChildProps>
  >(GetSingleProjectDocument, {
    alias: 'withGetSingleProject',
    ...operationOptions
  })
}

export function useGetSingleProjectQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<
    GetSingleProjectQueryVariables
  >
) {
  return ReactApolloHooks.useQuery<
    GetSingleProjectQuery,
    GetSingleProjectQueryVariables
  >(GetSingleProjectDocument, baseOptions)
}
export const UpdateStatusDocument = gql`
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
export type UpdateStatusMutationFn = ReactApollo.MutationFn<
  UpdateStatusMutation,
  UpdateStatusMutationVariables
>

export const UpdateStatusComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        UpdateStatusMutation,
        UpdateStatusMutationVariables
      >,
      'mutation'
    >,
    'variables'
  > & { variables?: UpdateStatusMutationVariables }
) => (
  <ReactApollo.Mutation<UpdateStatusMutation, UpdateStatusMutationVariables>
    mutation={UpdateStatusDocument}
    {...props}
  />
)

export type UpdateStatusProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UpdateStatusMutation, UpdateStatusMutationVariables>
> &
  TChildProps
export function withUpdateStatus<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UpdateStatusMutation,
    UpdateStatusMutationVariables,
    UpdateStatusProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    UpdateStatusMutation,
    UpdateStatusMutationVariables,
    UpdateStatusProps<TChildProps>
  >(UpdateStatusDocument, {
    alias: 'withUpdateStatus',
    ...operationOptions
  })
}

export function useUpdateStatusMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateStatusMutation,
    UpdateStatusMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    UpdateStatusMutation,
    UpdateStatusMutationVariables
  >(UpdateStatusDocument, baseOptions)
}
export const AddProjectDocument = gql`
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
      client {
        ...ClientFragment
      }
    }
  }
  ${BasicInfoFragmentFragmentDoc}
  ${PriceFragmentFragmentDoc}
  ${ClientFragmentFragmentDoc}
`
export type AddProjectMutationFn = ReactApollo.MutationFn<
  AddProjectMutation,
  AddProjectMutationVariables
>

export const AddProjectComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        AddProjectMutation,
        AddProjectMutationVariables
      >,
      'mutation'
    >,
    'variables'
  > & { variables?: AddProjectMutationVariables }
) => (
  <ReactApollo.Mutation<AddProjectMutation, AddProjectMutationVariables>
    mutation={AddProjectDocument}
    {...props}
  />
)

export type AddProjectProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<AddProjectMutation, AddProjectMutationVariables>
> &
  TChildProps
export function withAddProject<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    AddProjectMutation,
    AddProjectMutationVariables,
    AddProjectProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    AddProjectMutation,
    AddProjectMutationVariables,
    AddProjectProps<TChildProps>
  >(AddProjectDocument, {
    alias: 'withAddProject',
    ...operationOptions
  })
}

export function useAddProjectMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    AddProjectMutation,
    AddProjectMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    AddProjectMutation,
    AddProjectMutationVariables
  >(AddProjectDocument, baseOptions)
}
export const UpdateIncomesAndExpensesDocument = gql`
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
  ${PriceFragmentFragmentDoc}
`
export type UpdateIncomesAndExpensesMutationFn = ReactApollo.MutationFn<
  UpdateIncomesAndExpensesMutation,
  UpdateIncomesAndExpensesMutationVariables
>

export const UpdateIncomesAndExpensesComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        UpdateIncomesAndExpensesMutation,
        UpdateIncomesAndExpensesMutationVariables
      >,
      'mutation'
    >,
    'variables'
  > & { variables?: UpdateIncomesAndExpensesMutationVariables }
) => (
  <ReactApollo.Mutation<
    UpdateIncomesAndExpensesMutation,
    UpdateIncomesAndExpensesMutationVariables
  >
    mutation={UpdateIncomesAndExpensesDocument}
    {...props}
  />
)

export type UpdateIncomesAndExpensesProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    UpdateIncomesAndExpensesMutation,
    UpdateIncomesAndExpensesMutationVariables
  >
> &
  TChildProps
export function withUpdateIncomesAndExpenses<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UpdateIncomesAndExpensesMutation,
    UpdateIncomesAndExpensesMutationVariables,
    UpdateIncomesAndExpensesProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    UpdateIncomesAndExpensesMutation,
    UpdateIncomesAndExpensesMutationVariables,
    UpdateIncomesAndExpensesProps<TChildProps>
  >(UpdateIncomesAndExpensesDocument, {
    alias: 'withUpdateIncomesAndExpenses',
    ...operationOptions
  })
}

export function useUpdateIncomesAndExpensesMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateIncomesAndExpensesMutation,
    UpdateIncomesAndExpensesMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    UpdateIncomesAndExpensesMutation,
    UpdateIncomesAndExpensesMutationVariables
  >(UpdateIncomesAndExpensesDocument, baseOptions)
}
export const UpdateBasicInfoDocument = gql`
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
  ${BasicInfoFragmentFragmentDoc}
`
export type UpdateBasicInfoMutationFn = ReactApollo.MutationFn<
  UpdateBasicInfoMutation,
  UpdateBasicInfoMutationVariables
>

export const UpdateBasicInfoComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        UpdateBasicInfoMutation,
        UpdateBasicInfoMutationVariables
      >,
      'mutation'
    >,
    'variables'
  > & { variables?: UpdateBasicInfoMutationVariables }
) => (
  <ReactApollo.Mutation<
    UpdateBasicInfoMutation,
    UpdateBasicInfoMutationVariables
  >
    mutation={UpdateBasicInfoDocument}
    {...props}
  />
)

export type UpdateBasicInfoProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    UpdateBasicInfoMutation,
    UpdateBasicInfoMutationVariables
  >
> &
  TChildProps
export function withUpdateBasicInfo<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UpdateBasicInfoMutation,
    UpdateBasicInfoMutationVariables,
    UpdateBasicInfoProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    UpdateBasicInfoMutation,
    UpdateBasicInfoMutationVariables,
    UpdateBasicInfoProps<TChildProps>
  >(UpdateBasicInfoDocument, {
    alias: 'withUpdateBasicInfo',
    ...operationOptions
  })
}

export function useUpdateBasicInfoMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    UpdateBasicInfoMutation,
    UpdateBasicInfoMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    UpdateBasicInfoMutation,
    UpdateBasicInfoMutationVariables
  >(UpdateBasicInfoDocument, baseOptions)
}
export const DeleteProjectDocument = gql`
  mutation deleteProject($projectId: String!) {
    deleteProject(projectId: $projectId) {
      message
      project {
        id
      }
    }
  }
`
export type DeleteProjectMutationFn = ReactApollo.MutationFn<
  DeleteProjectMutation,
  DeleteProjectMutationVariables
>

export const DeleteProjectComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        DeleteProjectMutation,
        DeleteProjectMutationVariables
      >,
      'mutation'
    >,
    'variables'
  > & { variables?: DeleteProjectMutationVariables }
) => (
  <ReactApollo.Mutation<DeleteProjectMutation, DeleteProjectMutationVariables>
    mutation={DeleteProjectDocument}
    {...props}
  />
)

export type DeleteProjectProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<DeleteProjectMutation, DeleteProjectMutationVariables>
> &
  TChildProps
export function withDeleteProject<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    DeleteProjectMutation,
    DeleteProjectMutationVariables,
    DeleteProjectProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    DeleteProjectMutation,
    DeleteProjectMutationVariables,
    DeleteProjectProps<TChildProps>
  >(DeleteProjectDocument, {
    alias: 'withDeleteProject',
    ...operationOptions
  })
}

export function useDeleteProjectMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DeleteProjectMutation,
    DeleteProjectMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    DeleteProjectMutation,
    DeleteProjectMutationVariables
  >(DeleteProjectDocument, baseOptions)
}
export const DownloadInvoiceDocument = gql`
  mutation downloadInvoice($projectId: String!) {
    downloadInvoice(projectId: $projectId) {
      message
      data
    }
  }
`
export type DownloadInvoiceMutationFn = ReactApollo.MutationFn<
  DownloadInvoiceMutation,
  DownloadInvoiceMutationVariables
>

export const DownloadInvoiceComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        DownloadInvoiceMutation,
        DownloadInvoiceMutationVariables
      >,
      'mutation'
    >,
    'variables'
  > & { variables?: DownloadInvoiceMutationVariables }
) => (
  <ReactApollo.Mutation<
    DownloadInvoiceMutation,
    DownloadInvoiceMutationVariables
  >
    mutation={DownloadInvoiceDocument}
    {...props}
  />
)

export type DownloadInvoiceProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    DownloadInvoiceMutation,
    DownloadInvoiceMutationVariables
  >
> &
  TChildProps
export function withDownloadInvoice<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    DownloadInvoiceMutation,
    DownloadInvoiceMutationVariables,
    DownloadInvoiceProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    DownloadInvoiceMutation,
    DownloadInvoiceMutationVariables,
    DownloadInvoiceProps<TChildProps>
  >(DownloadInvoiceDocument, {
    alias: 'withDownloadInvoice',
    ...operationOptions
  })
}

export function useDownloadInvoiceMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    DownloadInvoiceMutation,
    DownloadInvoiceMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    DownloadInvoiceMutation,
    DownloadInvoiceMutationVariables
  >(DownloadInvoiceDocument, baseOptions)
}
