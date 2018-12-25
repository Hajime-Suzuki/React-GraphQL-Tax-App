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
  firstName?: string | null;

  lastName?: string | null;

  email?: string | null;

  phone?: string | null;

  postalCode?: string | null;

  address?: string | null;
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

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  getUser?: User | null;

  getProjectsByUserId: Project[];

  getSingleProject?: Project | null;
}

export interface User {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  password: string;

  projects?: Project[] | null;

  expenses?: Expense[] | null;
}

export interface Project {
  id: string;

  invoiceNumber: string;

  invoiceDate?: string | null;

  name: string;

  date?: Date | null;

  streetAddress?: string | null;

  city?: string | null;

  link?: string | null;

  status: InvoiceStatus;

  client?: Client | null;

  user: string;

  expenses?: ExpenseAndIncome[] | null;

  incomes?: ExpenseAndIncome[] | null;
}

export interface Client {
  firstName?: string | null;

  lastName?: string | null;

  email?: string | null;

  phone?: string | null;

  postalCode?: string | null;

  address?: string | null;

  user?: string | null;
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

export interface Mutation {
  registerUser: RegisterResponse;

  loginUser: RegisterResponse;

  updateProject: MutationProjectResponse;

  addProject?: MutationProjectResponse | null;
}

export interface RegisterResponse {
  success: boolean;

  message?: string | null;

  token: string;
}

export interface MutationProjectResponse {
  success: boolean;

  message?: string | null;

  project?: Project | null;
}

// ====================================================
// Arguments
// ====================================================

export interface GetUserQueryArgs {
  id: string;
}
export interface GetProjectsByUserIdQueryArgs {
  userId: string;
}
export interface GetSingleProjectQueryArgs {
  projectId: string;
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
export interface UpdateProjectMutationArgs {
  projectId: string;

  data: ProjectInput;
}
export interface AddProjectMutationArgs {
  data: ProjectInput;
}
