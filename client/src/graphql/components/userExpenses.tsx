import gql from "graphql-tag";
import * as ReactApolloHooks from "react-apollo-hooks";
export type Maybe<T> = T | null;
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
export type GetUserExpensesQueryVariables = {};

export type GetUserExpensesQuery = { __typename?: "Query" } & {
  getUserExpenses: Array<
    { __typename?: "UserExpense" } & Pick<
      UserExpense,
      "id" | "name" | "price" | "quantity" | "date" | "taxRate"
    >
  >;
};

export const GetUserExpensesDocument = gql`
  query getUserExpenses {
    getUserExpenses {
      id
      name
      price
      quantity
      date
      taxRate
    }
  }
`;

export function useGetUserExpensesQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<GetUserExpensesQueryVariables>
) {
  return ReactApolloHooks.useQuery<
    GetUserExpensesQuery,
    GetUserExpensesQueryVariables
  >(GetUserExpensesDocument, baseOptions);
}
