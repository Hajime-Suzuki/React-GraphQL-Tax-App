import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
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
export type GetClientsListQueryVariables = {};

export type GetClientsListQuery = { __typename?: "Query" } & {
  getClientsByUser: Maybe<
    Array<{ __typename?: "Client" } & ClientFragmentFragment>
  >;
};

export type SingleClientQueryVariables = {
  id: Scalars["String"];
};

export type SingleClientQuery = { __typename?: "Query" } & {
  getSingleClient: Maybe<
    { __typename?: "Client" } & Pick<
      Client,
      "streetAddress" | "postalCode" | "city"
    > &
      ClientFragmentFragment
  >;
};

export type AddClientMutationVariables = {
  data: ClientInput;
};

export type AddClientMutation = { __typename?: "Mutation" } & {
  addClient: Maybe<
    { __typename?: "ClientMutationResponse" } & {
      client: Maybe<{ __typename?: "Client" } & ClientFragmentFragment>;
    }
  >;
};

export type UpdateClientMutationVariables = {
  clientId: Scalars["String"];
  data: ClientInput;
};

export type UpdateClientMutation = { __typename?: "Mutation" } & {
  updateClient: Maybe<
    { __typename?: "ClientMutationResponse" } & Pick<
      ClientMutationResponse,
      "message"
    > & {
        client: Maybe<
          { __typename?: "Client" } & Pick<
            Client,
            "streetAddress" | "postalCode" | "city"
          > &
            ClientFragmentFragment
        >;
      }
  >;
};

export type UpdateClientProjectMutationVariables = {
  clientId: Scalars["String"];
  projectId: Scalars["String"];
};

export type UpdateClientProjectMutation = { __typename?: "Mutation" } & {
  updateClientProject: Maybe<
    { __typename?: "ClientMutationResponse" } & {
      client: Maybe<
        { __typename?: "Client" } & Pick<
          Client,
          "streetAddress" | "postalCode" | "city"
        > &
          ClientFragmentFragment
      >;
    }
  >;
};

export type DeleteClientMutationVariables = {
  clientId: Scalars["String"];
};

export type DeleteClientMutation = { __typename?: "Mutation" } & {
  deleteClient: Maybe<
    { __typename?: "ClientMutationResponse" } & {
      client: Maybe<{ __typename?: "Client" } & Pick<Client, "id">>;
    }
  >;
};

export type RemoveClientFromProjectMutationVariables = {
  clientId: Scalars["String"];
  projectId: Scalars["String"];
};

export type RemoveClientFromProjectMutation = { __typename?: "Mutation" } & {
  removeClientFromProject: Maybe<
    { __typename?: "ClientMutationResponse" } & {
      client: Maybe<{ __typename?: "Client" } & ClientFragmentFragment>;
    }
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
export const GetClientsListDocument = gql`
  query getClientsList {
    getClientsByUser {
      ...ClientFragment
    }
  }
  ${ClientFragmentFragmentDoc}
`;
export type GetClientsListComponentProps = Omit<
  Omit<
    ReactApollo.QueryProps<GetClientsListQuery, GetClientsListQueryVariables>,
    "query"
  >,
  "variables"
> & { variables?: GetClientsListQueryVariables };

export const GetClientsListComponent = (
  props: GetClientsListComponentProps
) => (
  <ReactApollo.Query<GetClientsListQuery, GetClientsListQueryVariables>
    query={GetClientsListDocument}
    {...props}
  />
);

export type GetClientsListProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetClientsListQuery, GetClientsListQueryVariables>
> &
  TChildProps;
export function withGetClientsList<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    GetClientsListQuery,
    GetClientsListQueryVariables,
    GetClientsListProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    GetClientsListQuery,
    GetClientsListQueryVariables,
    GetClientsListProps<TChildProps>
  >(GetClientsListDocument, {
    alias: "withGetClientsList",
    ...operationOptions
  });
}
export const SingleClientDocument = gql`
  query singleClient($id: String!) {
    getSingleClient(clientId: $id) {
      ...ClientFragment
      streetAddress
      postalCode
      city
    }
  }
  ${ClientFragmentFragmentDoc}
`;
export type SingleClientComponentProps = Omit<
  Omit<
    ReactApollo.QueryProps<SingleClientQuery, SingleClientQueryVariables>,
    "query"
  >,
  "variables"
> & { variables: SingleClientQueryVariables };

export const SingleClientComponent = (props: SingleClientComponentProps) => (
  <ReactApollo.Query<SingleClientQuery, SingleClientQueryVariables>
    query={SingleClientDocument}
    {...props}
  />
);

export type SingleClientProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<SingleClientQuery, SingleClientQueryVariables>
> &
  TChildProps;
export function withSingleClient<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    SingleClientQuery,
    SingleClientQueryVariables,
    SingleClientProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    SingleClientQuery,
    SingleClientQueryVariables,
    SingleClientProps<TChildProps>
  >(SingleClientDocument, {
    alias: "withSingleClient",
    ...operationOptions
  });
}
export const AddClientDocument = gql`
  mutation addClient($data: ClientInput!) {
    addClient(data: $data) {
      client {
        ...ClientFragment
      }
    }
  }
  ${ClientFragmentFragmentDoc}
`;
export type AddClientMutationFn = ReactApollo.MutationFn<
  AddClientMutation,
  AddClientMutationVariables
>;
export type AddClientComponentProps = Omit<
  Omit<
    ReactApollo.MutationProps<AddClientMutation, AddClientMutationVariables>,
    "mutation"
  >,
  "variables"
> & { variables?: AddClientMutationVariables };

export const AddClientComponent = (props: AddClientComponentProps) => (
  <ReactApollo.Mutation<AddClientMutation, AddClientMutationVariables>
    mutation={AddClientDocument}
    {...props}
  />
);

export type AddClientProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<AddClientMutation, AddClientMutationVariables>
> &
  TChildProps;
export function withAddClient<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    AddClientMutation,
    AddClientMutationVariables,
    AddClientProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    AddClientMutation,
    AddClientMutationVariables,
    AddClientProps<TChildProps>
  >(AddClientDocument, {
    alias: "withAddClient",
    ...operationOptions
  });
}
export const UpdateClientDocument = gql`
  mutation updateClient($clientId: String!, $data: ClientInput!) {
    updateClient(clientId: $clientId, data: $data) {
      message
      client {
        ...ClientFragment
        streetAddress
        postalCode
        city
      }
    }
  }
  ${ClientFragmentFragmentDoc}
`;
export type UpdateClientMutationFn = ReactApollo.MutationFn<
  UpdateClientMutation,
  UpdateClientMutationVariables
>;
export type UpdateClientComponentProps = Omit<
  Omit<
    ReactApollo.MutationProps<
      UpdateClientMutation,
      UpdateClientMutationVariables
    >,
    "mutation"
  >,
  "variables"
> & { variables?: UpdateClientMutationVariables };

export const UpdateClientComponent = (props: UpdateClientComponentProps) => (
  <ReactApollo.Mutation<UpdateClientMutation, UpdateClientMutationVariables>
    mutation={UpdateClientDocument}
    {...props}
  />
);

export type UpdateClientProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UpdateClientMutation, UpdateClientMutationVariables>
> &
  TChildProps;
export function withUpdateClient<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UpdateClientMutation,
    UpdateClientMutationVariables,
    UpdateClientProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    UpdateClientMutation,
    UpdateClientMutationVariables,
    UpdateClientProps<TChildProps>
  >(UpdateClientDocument, {
    alias: "withUpdateClient",
    ...operationOptions
  });
}
export const UpdateClientProjectDocument = gql`
  mutation updateClientProject($clientId: String!, $projectId: String!) {
    updateClientProject(clientId: $clientId, projectId: $projectId) {
      client {
        ...ClientFragment
        streetAddress
        postalCode
        city
      }
    }
  }
  ${ClientFragmentFragmentDoc}
`;
export type UpdateClientProjectMutationFn = ReactApollo.MutationFn<
  UpdateClientProjectMutation,
  UpdateClientProjectMutationVariables
>;
export type UpdateClientProjectComponentProps = Omit<
  Omit<
    ReactApollo.MutationProps<
      UpdateClientProjectMutation,
      UpdateClientProjectMutationVariables
    >,
    "mutation"
  >,
  "variables"
> & { variables?: UpdateClientProjectMutationVariables };

export const UpdateClientProjectComponent = (
  props: UpdateClientProjectComponentProps
) => (
  <ReactApollo.Mutation<
    UpdateClientProjectMutation,
    UpdateClientProjectMutationVariables
  >
    mutation={UpdateClientProjectDocument}
    {...props}
  />
);

export type UpdateClientProjectProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    UpdateClientProjectMutation,
    UpdateClientProjectMutationVariables
  >
> &
  TChildProps;
export function withUpdateClientProject<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    UpdateClientProjectMutation,
    UpdateClientProjectMutationVariables,
    UpdateClientProjectProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    UpdateClientProjectMutation,
    UpdateClientProjectMutationVariables,
    UpdateClientProjectProps<TChildProps>
  >(UpdateClientProjectDocument, {
    alias: "withUpdateClientProject",
    ...operationOptions
  });
}
export const DeleteClientDocument = gql`
  mutation deleteClient($clientId: String!) {
    deleteClient(clientId: $clientId) {
      client {
        id
      }
    }
  }
`;
export type DeleteClientMutationFn = ReactApollo.MutationFn<
  DeleteClientMutation,
  DeleteClientMutationVariables
>;
export type DeleteClientComponentProps = Omit<
  Omit<
    ReactApollo.MutationProps<
      DeleteClientMutation,
      DeleteClientMutationVariables
    >,
    "mutation"
  >,
  "variables"
> & { variables?: DeleteClientMutationVariables };

export const DeleteClientComponent = (props: DeleteClientComponentProps) => (
  <ReactApollo.Mutation<DeleteClientMutation, DeleteClientMutationVariables>
    mutation={DeleteClientDocument}
    {...props}
  />
);

export type DeleteClientProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<DeleteClientMutation, DeleteClientMutationVariables>
> &
  TChildProps;
export function withDeleteClient<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    DeleteClientMutation,
    DeleteClientMutationVariables,
    DeleteClientProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    DeleteClientMutation,
    DeleteClientMutationVariables,
    DeleteClientProps<TChildProps>
  >(DeleteClientDocument, {
    alias: "withDeleteClient",
    ...operationOptions
  });
}
export const RemoveClientFromProjectDocument = gql`
  mutation removeClientFromProject($clientId: String!, $projectId: String!) {
    removeClientFromProject(clientId: $clientId, projectId: $projectId) {
      client {
        ...ClientFragment
      }
    }
  }
  ${ClientFragmentFragmentDoc}
`;
export type RemoveClientFromProjectMutationFn = ReactApollo.MutationFn<
  RemoveClientFromProjectMutation,
  RemoveClientFromProjectMutationVariables
>;
export type RemoveClientFromProjectComponentProps = Omit<
  Omit<
    ReactApollo.MutationProps<
      RemoveClientFromProjectMutation,
      RemoveClientFromProjectMutationVariables
    >,
    "mutation"
  >,
  "variables"
> & { variables?: RemoveClientFromProjectMutationVariables };

export const RemoveClientFromProjectComponent = (
  props: RemoveClientFromProjectComponentProps
) => (
  <ReactApollo.Mutation<
    RemoveClientFromProjectMutation,
    RemoveClientFromProjectMutationVariables
  >
    mutation={RemoveClientFromProjectDocument}
    {...props}
  />
);

export type RemoveClientFromProjectProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    RemoveClientFromProjectMutation,
    RemoveClientFromProjectMutationVariables
  >
> &
  TChildProps;
export function withRemoveClientFromProject<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    RemoveClientFromProjectMutation,
    RemoveClientFromProjectMutationVariables,
    RemoveClientFromProjectProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    RemoveClientFromProjectMutation,
    RemoveClientFromProjectMutationVariables,
    RemoveClientFromProjectProps<TChildProps>
  >(RemoveClientFromProjectDocument, {
    alias: "withRemoveClientFromProject",
    ...operationOptions
  });
}
