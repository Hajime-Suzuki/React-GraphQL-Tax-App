export interface UpdateProjectInput {
  status: InvoiceStatus;
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
// Interfaces
// ====================================================

export interface MutationResponse {
  success: boolean;

  message?: string | null;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  getUser?: User | null;

  getProjectsByUserId: Project[];
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

  contactPerson?: ContactPerson | null;

  user: string;

  expenses?: ExpenseAndIncome[] | null;

  incomes?: ExpenseAndIncome[] | null;
}

export interface ContactPerson {
  firstName?: string | null;

  lastName?: string | null;

  email?: string | null;

  phone?: string | null;

  link?: string | null;
}

export interface ExpenseAndIncome {
  name: string;

  price: number;

  quantity: number;

  taxRate: number;
}

export interface Expense {
  name?: string | null;

  price?: number | null;

  quantity?: number | null;

  taxRate?: number | null;

  date?: string | null;

  user?: User | null;
}

export interface Mutation {
  registerUser: RegisterResponse;

  loginUser: RegisterResponse;

  updateProject: MutationProjectResponse;
}

export interface RegisterResponse {
  success: boolean;

  message?: string | null;

  token: string;
}

export interface MutationProjectResponse extends MutationResponse {
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

  data: UpdateProjectInput;
}
