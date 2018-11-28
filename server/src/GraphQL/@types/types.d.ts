export enum InvoiceStatus {
  none = "none",
  invoice = "invoice",
  paid = "paid"
}

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
  invoiceNumber: string;

  inVoiceDate?: string | null;

  name: string;

  date?: string | null;

  streetAddress?: string | null;

  city?: string | null;

  link?: string | null;

  status?: InvoiceStatus | null;

  contactPerson?: ContactPerson | null;

  user: string;

  expenses?: (ExpenseAndIncome | null)[] | null;

  incomes?: (ExpenseAndIncome | null)[] | null;
}

export interface ContactPerson {
  firstName?: string | null;

  lastName?: string | null;

  email?: string | null;

  phone?: string | null;

  link?: string | null;
}

export interface ExpenseAndIncome {
  name?: string | null;

  price?: number | null;

  quantity?: number | null;

  taxRate?: number | null;
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
  registerUser?: RegisterResponse | null;

  loginUser?: RegisterResponse | null;
}

export interface RegisterResponse {
  success: boolean;

  message?: string | null;

  token: string;
}

// ====================================================
// Arguments
// ====================================================

export interface GetUserQueryArgs {
  id: string;
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
