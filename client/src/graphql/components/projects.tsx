import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
import * as ReactApolloHooks from "react-apollo-hooks";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Blob: any;
};

export type Client = {
  __typename?: "Client";
  id: Scalars["String"];
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  user?: Maybe<Scalars["String"]>;
  projects?: Maybe<Array<Scalars["String"]>>;
  streetAddress?: Maybe<Scalars["String"]>;
  postalCode?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
};

export type ClientInput = {
  id?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  streetAddress?: Maybe<Scalars["String"]>;
  postalCode?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
};

export type ClientMutationResponse = {
  __typename?: "ClientMutationResponse";
  message?: Maybe<Scalars["String"]>;
  client?: Maybe<Client>;
};

export type ExpenseAndIncome = {
  __typename?: "ExpenseAndIncome";
  name?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["String"]>;
  quantity?: Maybe<Scalars["Int"]>;
  taxRate?: Maybe<Scalars["Int"]>;
};

export type ExpenseAndIncomeInput = {
  name?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["String"]>;
  quantity?: Maybe<Scalars["Int"]>;
  taxRate?: Maybe<Scalars["Int"]>;
};

export type GenerateInvoiceResponse = {
  __typename?: "GenerateInvoiceResponse";
  message?: Maybe<Scalars["String"]>;
  data?: Maybe<Scalars["Blob"]>;
};

export type GetProjectsFilter = {
  year?: Maybe<Scalars["Int"]>;
};

export enum Invoice_Status {
  None = "none",
  Invoice = "invoice",
  Paid = "paid"
}

export type Mutation = {
  __typename?: "Mutation";
  registerUser: RegisterResponse;
  loginUser: RegisterResponse;
  updateUser: UpdateUserResponse;
  changePassword: RegisterResponse;
  updateProject: MutationProjectResponse;
  addProject?: Maybe<MutationProjectResponse>;
  deleteProject?: Maybe<MutationProjectResponse>;
  addUserExpense: MutationUserExpensesResponse;
  updateUserExpense: MutationUserExpensesResponse;
  deleteUserExpense?: Maybe<Scalars["Boolean"]>;
  addClient?: Maybe<ClientMutationResponse>;
  updateClient?: Maybe<ClientMutationResponse>;
  updateClientProject?: Maybe<ClientMutationResponse>;
  removeClientFromProject?: Maybe<ClientMutationResponse>;
  deleteClient?: Maybe<ClientMutationResponse>;
  downloadInvoice?: Maybe<GenerateInvoiceResponse>;
};

export type MutationRegisterUserArgs = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationLoginUserArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type MutationChangePasswordArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationUpdateProjectArgs = {
  projectId: Scalars["String"];
  data: ProjectInput;
};

export type MutationAddProjectArgs = {
  data: ProjectInput;
};

export type MutationDeleteProjectArgs = {
  projectId: Scalars["String"];
};

export type MutationAddUserExpenseArgs = {
  data: UserExpenseInput;
};

export type MutationUpdateUserExpenseArgs = {
  id: Scalars["ID"];
  data: UpdateUserExpenseInput;
};

export type MutationDeleteUserExpenseArgs = {
  id: Scalars["ID"];
};

export type MutationAddClientArgs = {
  data: ClientInput;
};

export type MutationUpdateClientArgs = {
  clientId: Scalars["String"];
  data: ClientInput;
};

export type MutationUpdateClientProjectArgs = {
  projectId: Scalars["String"];
  clientId: Scalars["String"];
};

export type MutationRemoveClientFromProjectArgs = {
  projectId: Scalars["String"];
  clientId: Scalars["String"];
};

export type MutationDeleteClientArgs = {
  clientId: Scalars["String"];
};

export type MutationDownloadInvoiceArgs = {
  projectId: Scalars["String"];
};

export type MutationProjectResponse = {
  __typename?: "MutationProjectResponse";
  success: Scalars["Boolean"];
  message?: Maybe<Scalars["String"]>;
  project: Project;
  client?: Maybe<Client>;
};

export type MutationUserExpensesResponse = {
  __typename?: "MutationUserExpensesResponse";
  message?: Maybe<Scalars["String"]>;
  userExpense?: Maybe<UserExpense>;
};

export type Project = {
  __typename?: "Project";
  id: Scalars["String"];
  invoiceNumber: Scalars["String"];
  invoiceDate?: Maybe<Scalars["Date"]>;
  name: Scalars["String"];
  projectDate?: Maybe<Scalars["Date"]>;
  streetAddress?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  link?: Maybe<Scalars["String"]>;
  status: Invoice_Status;
  user: Scalars["String"];
  expenses: Array<ExpenseAndIncome>;
  incomes: Array<ExpenseAndIncome>;
};

export type ProjectInput = {
  invoiceNumber?: Maybe<Scalars["String"]>;
  invoiceDate?: Maybe<Scalars["String"]>;
  projectDate?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["String"]>;
  status?: Maybe<Invoice_Status>;
  client?: Maybe<ClientInput>;
  expenses?: Maybe<Array<ExpenseAndIncomeInput>>;
  incomes?: Maybe<Array<ExpenseAndIncomeInput>>;
};

export type Query = {
  __typename?: "Query";
  getUser: User;
  getProjectsByUserId: Array<Project>;
  getProjects: Array<Project>;
  getSingleProject?: Maybe<Project>;
  getUserExpenses: Array<UserExpense>;
  getClientsByUser?: Maybe<Array<Client>>;
  getClientByProject?: Maybe<Client>;
  getSingleClient?: Maybe<Client>;
  health?: Maybe<Scalars["String"]>;
};

export type QueryGetProjectsByUserIdArgs = {
  userId: Scalars["String"];
};

export type QueryGetProjectsArgs = {
  filter?: Maybe<GetProjectsFilter>;
  sortOption?: Maybe<SortOption>;
};

export type QueryGetSingleProjectArgs = {
  projectId: Scalars["String"];
};

export type QueryGetClientByProjectArgs = {
  projectId: Scalars["String"];
};

export type QueryGetSingleClientArgs = {
  clientId: Scalars["String"];
};

export type RegisterResponse = {
  __typename?: "RegisterResponse";
  success: Scalars["Boolean"];
  message?: Maybe<Scalars["String"]>;
  token: Scalars["String"];
};

export type SortOption = {
  invoiceDate?: Maybe<Scalars["Int"]>;
};

export type UpdateUserExpenseInput = {
  name?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["String"]>;
  quantity?: Maybe<Scalars["Int"]>;
  taxRate?: Maybe<Scalars["Int"]>;
  date?: Maybe<Scalars["String"]>;
};

export type UpdateUserInput = {
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  btw?: Maybe<Scalars["String"]>;
  kvk?: Maybe<Scalars["String"]>;
  iban?: Maybe<Scalars["String"]>;
  streetAddress?: Maybe<Scalars["String"]>;
  postalCode?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
};

export type UpdateUserResponse = {
  __typename?: "UpdateUserResponse";
  message?: Maybe<Scalars["String"]>;
  user: User;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  projects?: Maybe<Array<Project>>;
  clients?: Maybe<Array<Client>>;
  btw?: Maybe<Scalars["String"]>;
  kvk?: Maybe<Scalars["String"]>;
  iban?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  streetAddress?: Maybe<Scalars["String"]>;
  postalCode?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["Date"]>;
  updatedAt?: Maybe<Scalars["Date"]>;
};

export type UserExpense = {
  __typename?: "UserExpense";
  id: Scalars["ID"];
  name: Scalars["String"];
  price: Scalars["String"];
  quantity: Scalars["Int"];
  taxRate: Scalars["Int"];
  date: Scalars["String"];
  user: Scalars["String"];
};

export type UserExpenseInput = {
  name: Scalars["String"];
  price: Scalars["String"];
  quantity: Scalars["Int"];
  taxRate: Scalars["Int"];
  date: Scalars["String"];
};
export type GetProjectOverviewQueryVariables = {
  userId: Scalars["String"];
};

export type GetProjectOverviewQuery = { __typename?: "Query" } & {
  projects: Array<
    { __typename?: "Project" } & {
      incomes: Array<
        { __typename?: "ExpenseAndIncome" } & PriceFragmentFragment
      >;
      expenses: Array<
        { __typename?: "ExpenseAndIncome" } & PriceFragmentFragment
      >;
    } & BasicInfoFragmentFragment
  >;
};

export type GetFiscalProjectsQueryVariables = {
  filter?: Maybe<GetProjectsFilter>;
};

export type GetFiscalProjectsQuery = { __typename?: "Query" } & {
  projects: Array<
    { __typename?: "Project" } & Pick<
      Project,
      "name" | "invoiceNumber" | "invoiceDate" | "projectDate"
    > & {
        incomes: Array<
          { __typename?: "ExpenseAndIncome" } & PriceFragmentFragment
        >;
        expenses: Array<
          { __typename?: "ExpenseAndIncome" } & PriceFragmentFragment
        >;
      }
  >;
};

export type GetSingleProjectQueryVariables = {
  id: Scalars["String"];
};

export type GetSingleProjectQuery = { __typename?: "Query" } & {
  project: Maybe<
    { __typename?: "Project" } & Pick<Project, "invoiceNumber"> & {
        incomes: Array<
          { __typename?: "ExpenseAndIncome" } & Pick<ExpenseAndIncome, "name"> &
            PriceFragmentFragment
        >;
        expenses: Array<
          { __typename?: "ExpenseAndIncome" } & Pick<ExpenseAndIncome, "name"> &
            PriceFragmentFragment
        >;
      } & BasicInfoFragmentFragment
  >;
  client: Maybe<
    { __typename?: "Client" } & Pick<
      Client,
      "streetAddress" | "postalCode" | "city"
    > &
      ClientFragmentFragment
  >;
};

export type UpdateStatusMutationVariables = {
  projectId: Scalars["String"];
  data: ProjectInput;
};

export type UpdateStatusMutation = { __typename?: "Mutation" } & {
  updateProject: { __typename?: "MutationProjectResponse" } & Pick<
    MutationProjectResponse,
    "success" | "message"
  > & { project: { __typename?: "Project" } & Pick<Project, "id" | "status"> };
};

export type AddProjectMutationVariables = {
  data: ProjectInput;
};

export type AddProjectMutation = { __typename?: "Mutation" } & {
  addProject: Maybe<
    { __typename?: "MutationProjectResponse" } & Pick<
      MutationProjectResponse,
      "success" | "message"
    > & {
        project: { __typename?: "Project" } & Pick<Project, "invoiceNumber"> & {
            incomes: Array<
              { __typename?: "ExpenseAndIncome" } & Pick<
                ExpenseAndIncome,
                "name"
              > &
                PriceFragmentFragment
            >;
            expenses: Array<
              { __typename?: "ExpenseAndIncome" } & Pick<
                ExpenseAndIncome,
                "name"
              > &
                PriceFragmentFragment
            >;
          } & BasicInfoFragmentFragment;
        client: Maybe<{ __typename?: "Client" } & ClientFragmentFragment>;
      }
  >;
};

export type UpdateIncomesAndExpensesMutationVariables = {
  projectId: Scalars["String"];
  data: ProjectInput;
};

export type UpdateIncomesAndExpensesMutation = { __typename?: "Mutation" } & {
  updateProject: { __typename?: "MutationProjectResponse" } & Pick<
    MutationProjectResponse,
    "success" | "message"
  > & {
      project: { __typename?: "Project" } & Pick<Project, "id"> & {
          incomes: Array<
            { __typename?: "ExpenseAndIncome" } & Pick<
              ExpenseAndIncome,
              "name"
            > &
              PriceFragmentFragment
          >;
          expenses: Array<
            { __typename?: "ExpenseAndIncome" } & Pick<
              ExpenseAndIncome,
              "name"
            > &
              PriceFragmentFragment
          >;
        };
    };
};

export type UpdateBasicInfoMutationVariables = {
  projectId: Scalars["String"];
  data: ProjectInput;
};

export type UpdateBasicInfoMutation = { __typename?: "Mutation" } & {
  updateProject: { __typename?: "MutationProjectResponse" } & Pick<
    MutationProjectResponse,
    "success" | "message"
  > & {
      project: { __typename?: "Project" } & Pick<Project, "invoiceNumber"> &
        BasicInfoFragmentFragment;
    };
};

export type DeleteProjectMutationVariables = {
  projectId: Scalars["String"];
};

export type DeleteProjectMutation = { __typename?: "Mutation" } & {
  deleteProject: Maybe<
    { __typename?: "MutationProjectResponse" } & Pick<
      MutationProjectResponse,
      "message"
    > & { project: { __typename?: "Project" } & Pick<Project, "id"> }
  >;
};

export type DownloadInvoiceMutationVariables = {
  projectId: Scalars["String"];
};

export type DownloadInvoiceMutation = { __typename?: "Mutation" } & {
  downloadInvoice: Maybe<
    { __typename?: "GenerateInvoiceResponse" } & Pick<
      GenerateInvoiceResponse,
      "message" | "data"
    >
  >;
};

export type ClientFragmentFragment = { __typename?: "Client" } & Pick<
  Client,
  "id" | "firstName" | "lastName" | "email" | "phone"
>;

export type PriceFragmentFragment = { __typename?: "ExpenseAndIncome" } & Pick<
  ExpenseAndIncome,
  "price" | "quantity" | "taxRate"
>;

export type BasicInfoFragmentFragment = { __typename?: "Project" } & Pick<
  Project,
  "id" | "name" | "projectDate" | "invoiceDate" | "status"
>;
export const ClientFragmentFragmentDoc = gql`
  fragment ClientFragment on Client {
    id
    firstName
    lastName
    email
    phone
  }
`;
export const PriceFragmentFragmentDoc = gql`
  fragment PriceFragment on ExpenseAndIncome {
    price
    quantity
    taxRate
  }
`;
export const BasicInfoFragmentFragmentDoc = gql`
  fragment BasicInfoFragment on Project {
    id
    name
    projectDate
    invoiceDate
    status
  }
`;
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
`;
export type GetProjectOverviewComponentProps = Omit<
  Omit<
    ReactApollo.QueryProps<
      GetProjectOverviewQuery,
      GetProjectOverviewQueryVariables
    >,
    "query"
  >,
  "variables"
> & { variables: GetProjectOverviewQueryVariables };

export const GetProjectOverviewComponent = (
  props: GetProjectOverviewComponentProps
) => (
  <ReactApollo.Query<GetProjectOverviewQuery, GetProjectOverviewQueryVariables>
    query={GetProjectOverviewDocument}
    {...props}
  />
);

export type GetProjectOverviewProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<
    GetProjectOverviewQuery,
    GetProjectOverviewQueryVariables
  >
> &
  TChildProps;
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
    alias: "withGetProjectOverview",
    ...operationOptions
  });
}

export function useGetProjectOverviewQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<
    GetProjectOverviewQueryVariables
  >
) {
  return ReactApolloHooks.useQuery<
    GetProjectOverviewQuery,
    GetProjectOverviewQueryVariables
  >(GetProjectOverviewDocument, baseOptions);
}
export const GetFiscalProjectsDocument = gql`
  query getFiscalProjects($filter: GetProjectsFilter) {
    projects: getProjects(filter: $filter, sortOption: { invoiceDate: 1 }) {
      name
      invoiceNumber
      invoiceDate
      projectDate
      incomes {
        ...PriceFragment
      }
      expenses {
        ...PriceFragment
      }
    }
  }
  ${PriceFragmentFragmentDoc}
`;
export type GetFiscalProjectsComponentProps = Omit<
  Omit<
    ReactApollo.QueryProps<
      GetFiscalProjectsQuery,
      GetFiscalProjectsQueryVariables
    >,
    "query"
  >,
  "variables"
> & { variables?: GetFiscalProjectsQueryVariables };

export const GetFiscalProjectsComponent = (
  props: GetFiscalProjectsComponentProps
) => (
  <ReactApollo.Query<GetFiscalProjectsQuery, GetFiscalProjectsQueryVariables>
    query={GetFiscalProjectsDocument}
    {...props}
  />
);

export type GetFiscalProjectsProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetFiscalProjectsQuery, GetFiscalProjectsQueryVariables>
> &
  TChildProps;
export function withGetFiscalProjects<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    GetFiscalProjectsQuery,
    GetFiscalProjectsQueryVariables,
    GetFiscalProjectsProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    GetFiscalProjectsQuery,
    GetFiscalProjectsQueryVariables,
    GetFiscalProjectsProps<TChildProps>
  >(GetFiscalProjectsDocument, {
    alias: "withGetFiscalProjects",
    ...operationOptions
  });
}

export function useGetFiscalProjectsQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<
    GetFiscalProjectsQueryVariables
  >
) {
  return ReactApolloHooks.useQuery<
    GetFiscalProjectsQuery,
    GetFiscalProjectsQueryVariables
  >(GetFiscalProjectsDocument, baseOptions);
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
`;
export type GetSingleProjectComponentProps = Omit<
  Omit<
    ReactApollo.QueryProps<
      GetSingleProjectQuery,
      GetSingleProjectQueryVariables
    >,
    "query"
  >,
  "variables"
> & { variables: GetSingleProjectQueryVariables };

export const GetSingleProjectComponent = (
  props: GetSingleProjectComponentProps
) => (
  <ReactApollo.Query<GetSingleProjectQuery, GetSingleProjectQueryVariables>
    query={GetSingleProjectDocument}
    {...props}
  />
);

export type GetSingleProjectProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetSingleProjectQuery, GetSingleProjectQueryVariables>
> &
  TChildProps;
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
    alias: "withGetSingleProject",
    ...operationOptions
  });
}

export function useGetSingleProjectQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<
    GetSingleProjectQueryVariables
  >
) {
  return ReactApolloHooks.useQuery<
    GetSingleProjectQuery,
    GetSingleProjectQueryVariables
  >(GetSingleProjectDocument, baseOptions);
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
`;
export type UpdateStatusMutationFn = ReactApollo.MutationFn<
  UpdateStatusMutation,
  UpdateStatusMutationVariables
>;
export type UpdateStatusComponentProps = Omit<
  Omit<
    ReactApollo.MutationProps<
      UpdateStatusMutation,
      UpdateStatusMutationVariables
    >,
    "mutation"
  >,
  "variables"
> & { variables?: UpdateStatusMutationVariables };

export const UpdateStatusComponent = (props: UpdateStatusComponentProps) => (
  <ReactApollo.Mutation<UpdateStatusMutation, UpdateStatusMutationVariables>
    mutation={UpdateStatusDocument}
    {...props}
  />
);

export type UpdateStatusProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UpdateStatusMutation, UpdateStatusMutationVariables>
> &
  TChildProps;
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
    alias: "withUpdateStatus",
    ...operationOptions
  });
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
  >(UpdateStatusDocument, baseOptions);
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
`;
export type AddProjectMutationFn = ReactApollo.MutationFn<
  AddProjectMutation,
  AddProjectMutationVariables
>;
export type AddProjectComponentProps = Omit<
  Omit<
    ReactApollo.MutationProps<AddProjectMutation, AddProjectMutationVariables>,
    "mutation"
  >,
  "variables"
> & { variables?: AddProjectMutationVariables };

export const AddProjectComponent = (props: AddProjectComponentProps) => (
  <ReactApollo.Mutation<AddProjectMutation, AddProjectMutationVariables>
    mutation={AddProjectDocument}
    {...props}
  />
);

export type AddProjectProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<AddProjectMutation, AddProjectMutationVariables>
> &
  TChildProps;
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
    alias: "withAddProject",
    ...operationOptions
  });
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
  >(AddProjectDocument, baseOptions);
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
`;
export type UpdateIncomesAndExpensesMutationFn = ReactApollo.MutationFn<
  UpdateIncomesAndExpensesMutation,
  UpdateIncomesAndExpensesMutationVariables
>;
export type UpdateIncomesAndExpensesComponentProps = Omit<
  Omit<
    ReactApollo.MutationProps<
      UpdateIncomesAndExpensesMutation,
      UpdateIncomesAndExpensesMutationVariables
    >,
    "mutation"
  >,
  "variables"
> & { variables?: UpdateIncomesAndExpensesMutationVariables };

export const UpdateIncomesAndExpensesComponent = (
  props: UpdateIncomesAndExpensesComponentProps
) => (
  <ReactApollo.Mutation<
    UpdateIncomesAndExpensesMutation,
    UpdateIncomesAndExpensesMutationVariables
  >
    mutation={UpdateIncomesAndExpensesDocument}
    {...props}
  />
);

export type UpdateIncomesAndExpensesProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    UpdateIncomesAndExpensesMutation,
    UpdateIncomesAndExpensesMutationVariables
  >
> &
  TChildProps;
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
    alias: "withUpdateIncomesAndExpenses",
    ...operationOptions
  });
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
  >(UpdateIncomesAndExpensesDocument, baseOptions);
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
`;
export type UpdateBasicInfoMutationFn = ReactApollo.MutationFn<
  UpdateBasicInfoMutation,
  UpdateBasicInfoMutationVariables
>;
export type UpdateBasicInfoComponentProps = Omit<
  Omit<
    ReactApollo.MutationProps<
      UpdateBasicInfoMutation,
      UpdateBasicInfoMutationVariables
    >,
    "mutation"
  >,
  "variables"
> & { variables?: UpdateBasicInfoMutationVariables };

export const UpdateBasicInfoComponent = (
  props: UpdateBasicInfoComponentProps
) => (
  <ReactApollo.Mutation<
    UpdateBasicInfoMutation,
    UpdateBasicInfoMutationVariables
  >
    mutation={UpdateBasicInfoDocument}
    {...props}
  />
);

export type UpdateBasicInfoProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    UpdateBasicInfoMutation,
    UpdateBasicInfoMutationVariables
  >
> &
  TChildProps;
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
    alias: "withUpdateBasicInfo",
    ...operationOptions
  });
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
  >(UpdateBasicInfoDocument, baseOptions);
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
`;
export type DeleteProjectMutationFn = ReactApollo.MutationFn<
  DeleteProjectMutation,
  DeleteProjectMutationVariables
>;
export type DeleteProjectComponentProps = Omit<
  Omit<
    ReactApollo.MutationProps<
      DeleteProjectMutation,
      DeleteProjectMutationVariables
    >,
    "mutation"
  >,
  "variables"
> & { variables?: DeleteProjectMutationVariables };

export const DeleteProjectComponent = (props: DeleteProjectComponentProps) => (
  <ReactApollo.Mutation<DeleteProjectMutation, DeleteProjectMutationVariables>
    mutation={DeleteProjectDocument}
    {...props}
  />
);

export type DeleteProjectProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<DeleteProjectMutation, DeleteProjectMutationVariables>
> &
  TChildProps;
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
    alias: "withDeleteProject",
    ...operationOptions
  });
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
  >(DeleteProjectDocument, baseOptions);
}
export const DownloadInvoiceDocument = gql`
  mutation downloadInvoice($projectId: String!) {
    downloadInvoice(projectId: $projectId) {
      message
      data
    }
  }
`;
export type DownloadInvoiceMutationFn = ReactApollo.MutationFn<
  DownloadInvoiceMutation,
  DownloadInvoiceMutationVariables
>;
export type DownloadInvoiceComponentProps = Omit<
  Omit<
    ReactApollo.MutationProps<
      DownloadInvoiceMutation,
      DownloadInvoiceMutationVariables
    >,
    "mutation"
  >,
  "variables"
> & { variables?: DownloadInvoiceMutationVariables };

export const DownloadInvoiceComponent = (
  props: DownloadInvoiceComponentProps
) => (
  <ReactApollo.Mutation<
    DownloadInvoiceMutation,
    DownloadInvoiceMutationVariables
  >
    mutation={DownloadInvoiceDocument}
    {...props}
  />
);

export type DownloadInvoiceProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    DownloadInvoiceMutation,
    DownloadInvoiceMutationVariables
  >
> &
  TChildProps;
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
    alias: "withDownloadInvoice",
    ...operationOptions
  });
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
  >(DownloadInvoiceDocument, baseOptions);
}
