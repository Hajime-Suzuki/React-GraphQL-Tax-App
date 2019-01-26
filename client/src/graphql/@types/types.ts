export interface UpdateUserInput {
  firstName?: string | null;

  lastName?: string | null;

  email?: string | null;

  phone?: string | null;

  password?: string | null;

  btw?: string | null;

  kvk?: string | null;

  iban?: string | null;

  streetAddress?: string | null;

  postalCode?: string | null;

  city?: string | null;
}

export interface ProjectInput {
  invoiceNumber?: string | null;

  invoiceDate?: string | null;

  projectDate?: string | null;

  name?: string | null;

  date?: string | null;

  status?: InvoiceStatus | null;

  client?: ClientInput | null;

  expenses?: ExpenseAndIncomeInput[] | null;

  incomes?: ExpenseAndIncomeInput[] | null;
}

export interface ClientInput {
  id?: string | null;

  firstName?: string | null;

  lastName?: string | null;

  email?: string | null;

  phone?: string | null;

  streetAddress?: string | null;

  postalCode?: string | null;

  city?: string | null;
}

export interface ExpenseAndIncomeInput {
  name?: string | null;

  price?: string | null;

  quantity?: number | null;

  taxRate?: number | null;
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

  getSingleProject?: Project | null;

  getClientsByUser?: Client[] | null;

  getClientByProject?: Client | null;

  getSingleClient?: Client | null;
}

export interface User {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  projects?: Project[] | null;

  expenses?: Expense[] | null;

  clients?: Client[] | null;

  btw?: string | null;

  kvk?: string | null;

  iban?: string | null;

  phone?: string | null;

  streetAddress?: string | null;

  postalCode?: string | null;

  city?: string | null;

  createdAt?: Date | null;

  updatedAt?: Date | null;
}

export interface Project {
  id: string;

  invoiceNumber: string;

  invoiceDate?: Date | null;

  name: string;

  projectDate?: Date | null;

  streetAddress?: string | null;

  city?: string | null;

  link?: string | null;

  status: InvoiceStatus;

  user: string;

  expenses?: ExpenseAndIncome[] | null;

  incomes?: ExpenseAndIncome[] | null;
}

export interface ExpenseAndIncome {
  name?: string | null;

  price?: string | null;

  quantity?: number | null;

  taxRate?: number | null;
}

export interface Expense {
  name?: string | null;

  price?: string | null;

  quantity?: number | null;

  taxRate?: number | null;

  date?: string | null;
}

export interface Client {
  id: string;

  firstName?: string | null;

  lastName?: string | null;

  email?: string | null;

  phone?: string | null;

  user?: string | null;

  projects?: string[] | null;

  streetAddress?: string | null;

  postalCode?: string | null;

  city?: string | null;
}

export interface Mutation {
  registerUser: RegisterResponse;

  loginUser: RegisterResponse;

  updateUser: UpdateUserResponse;

  updateProject: MutationProjectResponse;

  addProject?: MutationProjectResponse | null;

  deleteProject?: MutationProjectResponse | null;

  addClient?: ClientMutationResponse | null;

  updateClient?: ClientMutationResponse | null;

  updateClientProject?: ClientMutationResponse | null;

  removeClientFromProject?: ClientMutationResponse | null;

  deleteClient?: ClientMutationResponse | null;

  downloadInvoice?: GenerateInvoiceResponse | null;
}

export interface RegisterResponse {
  success: boolean;

  message?: string | null;

  token: string;
}

export interface UpdateUserResponse {
  message?: string | null;

  user: User;
}

export interface MutationProjectResponse {
  success: boolean;

  message?: string | null;

  project: Project;

  client?: Client | null;
}

export interface ClientMutationResponse {
  message?: string | null;

  client?: Client | null;
}

export interface GenerateInvoiceResponse {
  message?: string | null;

  data?: Blob | null;
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
