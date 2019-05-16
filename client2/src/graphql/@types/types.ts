export type Maybe<T> = T | null;

export interface UpdateUserInput {
  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  email?: Maybe<string>;

  phone?: Maybe<string>;

  password?: Maybe<string>;

  btw?: Maybe<string>;

  kvk?: Maybe<string>;

  iban?: Maybe<string>;

  streetAddress?: Maybe<string>;

  postalCode?: Maybe<string>;

  city?: Maybe<string>;
}

export interface ProjectInput {
  invoiceNumber?: Maybe<string>;

  invoiceDate?: Maybe<string>;

  projectDate?: Maybe<string>;

  name?: Maybe<string>;

  date?: Maybe<string>;

  status?: Maybe<InvoiceStatus>;

  client?: Maybe<ClientInput>;

  expenses?: Maybe<ExpenseAndIncomeInput[]>;

  incomes?: Maybe<ExpenseAndIncomeInput[]>;
}

export interface ClientInput {
  id?: Maybe<string>;

  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  email?: Maybe<string>;

  phone?: Maybe<string>;

  streetAddress?: Maybe<string>;

  postalCode?: Maybe<string>;

  city?: Maybe<string>;
}

export interface ExpenseAndIncomeInput {
  name?: Maybe<string>;

  price?: Maybe<string>;

  quantity?: Maybe<number>;

  taxRate?: Maybe<number>;
}

export interface GeneralExpenseInput {
  name: string;

  price: string;

  quantity: number;

  taxRate: number;

  date: string;
}

export enum InvoiceStatus {
  None = "none",
  Invoice = "invoice",
  Paid = "paid"
}

export type Date = any;

export type Blob = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  getUser: User;

  getProjectsByUserId: Project[];

  getSingleProject?: Maybe<Project>;

  getGeneralExpenses?: Maybe<GeneralExpense[]>;

  getClientsByUser?: Maybe<Client[]>;

  getClientByProject?: Maybe<Client>;

  getSingleClient?: Maybe<Client>;

  health?: Maybe<string>;
}

export interface User {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  projects?: Maybe<Project[]>;

  expenses?: Maybe<GeneralExpense[]>;

  clients?: Maybe<Client[]>;

  btw?: Maybe<string>;

  kvk?: Maybe<string>;

  iban?: Maybe<string>;

  phone?: Maybe<string>;

  streetAddress?: Maybe<string>;

  postalCode?: Maybe<string>;

  city?: Maybe<string>;

  createdAt?: Maybe<Date>;

  updatedAt?: Maybe<Date>;
}

export interface Project {
  id: string;

  invoiceNumber: string;

  invoiceDate?: Maybe<Date>;

  name: string;

  projectDate?: Maybe<Date>;

  streetAddress?: Maybe<string>;

  city?: Maybe<string>;

  link?: Maybe<string>;

  status: InvoiceStatus;

  user: string;

  expenses?: Maybe<ExpenseAndIncome[]>;

  incomes?: Maybe<ExpenseAndIncome[]>;
}

export interface ExpenseAndIncome {
  name?: Maybe<string>;

  price?: Maybe<string>;

  quantity?: Maybe<number>;

  taxRate?: Maybe<number>;
}

export interface GeneralExpense {
  name: string;

  price: string;

  quantity: number;

  taxRate: number;

  date: string;

  user: string;
}

export interface Client {
  id: string;

  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  email?: Maybe<string>;

  phone?: Maybe<string>;

  user?: Maybe<string>;

  projects?: Maybe<string[]>;

  streetAddress?: Maybe<string>;

  postalCode?: Maybe<string>;

  city?: Maybe<string>;
}

export interface Mutation {
  registerUser: RegisterResponse;

  loginUser: RegisterResponse;

  updateUser: UpdateUserResponse;

  changePassword: RegisterResponse;

  updateProject: MutationProjectResponse;

  addProject?: Maybe<MutationProjectResponse>;

  deleteProject?: Maybe<MutationProjectResponse>;

  addGeneralExpense: AddGeneralExpensesResponse;

  addClient?: Maybe<ClientMutationResponse>;

  updateClient?: Maybe<ClientMutationResponse>;

  updateClientProject?: Maybe<ClientMutationResponse>;

  removeClientFromProject?: Maybe<ClientMutationResponse>;

  deleteClient?: Maybe<ClientMutationResponse>;

  downloadInvoice?: Maybe<GenerateInvoiceResponse>;
}

export interface RegisterResponse {
  success: boolean;

  message?: Maybe<string>;

  token: string;
}

export interface UpdateUserResponse {
  message?: Maybe<string>;

  user: User;
}

export interface MutationProjectResponse {
  success: boolean;

  message?: Maybe<string>;

  project: Project;

  client?: Maybe<Client>;
}

export interface AddGeneralExpensesResponse {
  message?: Maybe<string>;

  generalExpense?: Maybe<GeneralExpense>;
}

export interface ClientMutationResponse {
  message?: Maybe<string>;

  client?: Maybe<Client>;
}

export interface GenerateInvoiceResponse {
  message?: Maybe<string>;

  data?: Maybe<Blob>;
}

// ====================================================
// Arguments
// ====================================================

export interface GetProjectsByUserIdQueryArgs {
  userId: string;
}
export interface GetSingleProjectQueryArgs {
  projectId: string;
}
export interface GetClientByProjectQueryArgs {
  projectId: string;
}
export interface GetSingleClientQueryArgs {
  clientId: string;
}
export interface RegisterUserMutationArgs {
  firstName: string;

  lastName: string;

  email: string;

  password: string;
}
export interface LoginUserMutationArgs {
  email: string;

  password: string;
}
export interface UpdateUserMutationArgs {
  data: UpdateUserInput;
}
export interface ChangePasswordMutationArgs {
  email: string;

  password: string;
}
export interface UpdateProjectMutationArgs {
  projectId: string;

  data: ProjectInput;
}
export interface AddProjectMutationArgs {
  data: ProjectInput;
}
export interface DeleteProjectMutationArgs {
  projectId: string;
}
export interface AddGeneralExpenseMutationArgs {
  data: GeneralExpenseInput;
}
export interface AddClientMutationArgs {
  data: ClientInput;
}
export interface UpdateClientMutationArgs {
  clientId: string;

  data: ClientInput;
}
export interface UpdateClientProjectMutationArgs {
  projectId: string;

  clientId: string;
}
export interface RemoveClientFromProjectMutationArgs {
  projectId: string;

  clientId: string;
}
export interface DeleteClientMutationArgs {
  clientId: string;
}
export interface DownloadInvoiceMutationArgs {
  projectId: string;
}
