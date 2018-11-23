// ====================================================
// Types
// ====================================================

export interface Query {
  getUser?: User | null
}

export interface User {
  id: string

  firstName: string

  lastName: string

  email: string

  password: string

  projects?: (Project | null)[] | null

  expenses?: (Expense | null)[] | null
}

export interface Project {
  invoiceNumber: string

  inVoiceDate?: string | null

  name: string

  date?: string | null

  streetAddress?: string | null

  city?: string | null

  link?: string | null

  status?: string | null

  contactPerson?: ContactPerson | null

  user: string

  expenses?: (ExpenseAndIncome | null)[] | null

  incomes?: (ExpenseAndIncome | null)[] | null
}

export interface ContactPerson {
  firstName?: string | null

  lastName?: string | null

  email?: string | null

  phone?: string | null

  link?: string | null
}

export interface ExpenseAndIncome {
  name?: string | null

  price?: number | null

  quantity?: number | null

  taxRate?: number | null
}

export interface Expense {
  name?: string | null

  price?: number | null

  quantity?: number | null

  taxRate?: number | null

  date?: string | null

  user?: User | null
}

// ====================================================
// Arguments
// ====================================================

export interface GetUserQueryArgs {
  id?: string | null
}
