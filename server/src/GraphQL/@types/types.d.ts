/* tslint:disable */
export enum IInvoiceStatus {
  None = 'none',
  Invoice = 'invoice',
  Paid = 'paid'
}

export type Date = any

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface IQuery {
  getUser?: IUser | null

  getProjectsByUserId: IProject[]
}

export interface IUser {
  id: string

  firstName: string

  lastName: string

  email: string

  password: string

  projects?: IProject[] | null

  expenses?: IExpense[] | null
}

export interface IProject {
  id: string

  invoiceNumber: string

  inVoiceDate?: string | null

  name: string

  date?: Date | null

  streetAddress?: string | null

  city?: string | null

  link?: string | null

  status?: IInvoiceStatus | null

  contactPerson?: IContactPerson | null

  user: string

  expenses?: (IExpenseAndIncome | null)[] | null

  incomes?: (IExpenseAndIncome | null)[] | null
}

export interface IContactPerson {
  firstName?: string | null

  lastName?: string | null

  email?: string | null

  phone?: string | null

  link?: string | null
}

export interface IExpenseAndIncome {
  name?: string | null

  price?: number | null

  quantity?: number | null

  taxRate?: number | null
}

export interface IExpense {
  name?: string | null

  price?: number | null

  quantity?: number | null

  taxRate?: number | null

  date?: string | null

  user?: IUser | null
}

export interface IMutation {
  registerUser: IRegisterResponse

  loginUser: IRegisterResponse
}

export interface IRegisterResponse {
  success: boolean

  message?: string | null

  token: string
}

// ====================================================
// Arguments
// ====================================================

export interface GetUserQueryArgs {
  id: string
}
export interface GetProjectsByUserIdQueryArgs {
  userId: string
}
export interface RegisterUserMutationArgs {
  firstName: string

  lastName: string

  email: string

  password: string
}
export interface LoginUserMutationArgs {
  email: string

  password: string
}

import { GraphQLResolveInfo, GraphQLScalarTypeConfig } from 'graphql'

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>

type Maybe<T> = T | null | undefined

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo
) => Maybe<Types>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export namespace QueryResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    getUser?: GetUserResolver<IUser | null, TypeParent, Context>

    getProjectsByUserId?: GetProjectsByUserIdResolver<
      IProject[],
      TypeParent,
      Context
    >
  }

  export type GetUserResolver<
    R = IUser | null,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, GetUserArgs>
  export interface GetUserArgs {
    id: string
  }

  export type GetProjectsByUserIdResolver<
    R = IProject[],
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, GetProjectsByUserIdArgs>
  export interface GetProjectsByUserIdArgs {
    userId: string
  }
}

export namespace UserResolvers {
  export interface Resolvers<Context = {}, TypeParent = IUser> {
    id?: IdResolver<string, TypeParent, Context>

    firstName?: FirstNameResolver<string, TypeParent, Context>

    lastName?: LastNameResolver<string, TypeParent, Context>

    email?: EmailResolver<string, TypeParent, Context>

    password?: PasswordResolver<string, TypeParent, Context>

    projects?: ProjectsResolver<IProject[] | null, TypeParent, Context>

    expenses?: ExpensesResolver<IExpense[] | null, TypeParent, Context>
  }

  export type IdResolver<R = string, Parent = IUser, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >
  export type FirstNameResolver<
    R = string,
    Parent = IUser,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type LastNameResolver<
    R = string,
    Parent = IUser,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type EmailResolver<
    R = string,
    Parent = IUser,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type PasswordResolver<
    R = string,
    Parent = IUser,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type ProjectsResolver<
    R = IProject[] | null,
    Parent = IUser,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type ExpensesResolver<
    R = IExpense[] | null,
    Parent = IUser,
    Context = {}
  > = Resolver<R, Parent, Context>
}

export namespace ProjectResolvers {
  export interface Resolvers<Context = {}, TypeParent = IProject> {
    id?: IdResolver<string, TypeParent, Context>

    invoiceNumber?: InvoiceNumberResolver<string, TypeParent, Context>

    inVoiceDate?: InVoiceDateResolver<string | null, TypeParent, Context>

    name?: NameResolver<string, TypeParent, Context>

    date?: DateResolver<Date | null, TypeParent, Context>

    streetAddress?: StreetAddressResolver<string | null, TypeParent, Context>

    city?: CityResolver<string | null, TypeParent, Context>

    link?: LinkResolver<string | null, TypeParent, Context>

    status?: StatusResolver<IInvoiceStatus | null, TypeParent, Context>

    contactPerson?: ContactPersonResolver<
      IContactPerson | null,
      TypeParent,
      Context
    >

    user?: UserResolver<string, TypeParent, Context>

    expenses?: ExpensesResolver<
      (IExpenseAndIncome | null)[] | null,
      TypeParent,
      Context
    >

    incomes?: IncomesResolver<
      (IExpenseAndIncome | null)[] | null,
      TypeParent,
      Context
    >
  }

  export type IdResolver<
    R = string,
    Parent = IProject,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type InvoiceNumberResolver<
    R = string,
    Parent = IProject,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type InVoiceDateResolver<
    R = string | null,
    Parent = IProject,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type NameResolver<
    R = string,
    Parent = IProject,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type DateResolver<
    R = Date | null,
    Parent = IProject,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type StreetAddressResolver<
    R = string | null,
    Parent = IProject,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type CityResolver<
    R = string | null,
    Parent = IProject,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type LinkResolver<
    R = string | null,
    Parent = IProject,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type StatusResolver<
    R = IInvoiceStatus | null,
    Parent = IProject,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type ContactPersonResolver<
    R = IContactPerson | null,
    Parent = IProject,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type UserResolver<
    R = string,
    Parent = IProject,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type ExpensesResolver<
    R = (IExpenseAndIncome | null)[] | null,
    Parent = IProject,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type IncomesResolver<
    R = (IExpenseAndIncome | null)[] | null,
    Parent = IProject,
    Context = {}
  > = Resolver<R, Parent, Context>
}

export namespace ContactPersonResolvers {
  export interface Resolvers<Context = {}, TypeParent = IContactPerson> {
    firstName?: FirstNameResolver<string | null, TypeParent, Context>

    lastName?: LastNameResolver<string | null, TypeParent, Context>

    email?: EmailResolver<string | null, TypeParent, Context>

    phone?: PhoneResolver<string | null, TypeParent, Context>

    link?: LinkResolver<string | null, TypeParent, Context>
  }

  export type FirstNameResolver<
    R = string | null,
    Parent = IContactPerson,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type LastNameResolver<
    R = string | null,
    Parent = IContactPerson,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type EmailResolver<
    R = string | null,
    Parent = IContactPerson,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type PhoneResolver<
    R = string | null,
    Parent = IContactPerson,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type LinkResolver<
    R = string | null,
    Parent = IContactPerson,
    Context = {}
  > = Resolver<R, Parent, Context>
}

export namespace ExpenseAndIncomeResolvers {
  export interface Resolvers<Context = {}, TypeParent = IExpenseAndIncome> {
    name?: NameResolver<string | null, TypeParent, Context>

    price?: PriceResolver<number | null, TypeParent, Context>

    quantity?: QuantityResolver<number | null, TypeParent, Context>

    taxRate?: TaxRateResolver<number | null, TypeParent, Context>
  }

  export type NameResolver<
    R = string | null,
    Parent = IExpenseAndIncome,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type PriceResolver<
    R = number | null,
    Parent = IExpenseAndIncome,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type QuantityResolver<
    R = number | null,
    Parent = IExpenseAndIncome,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type TaxRateResolver<
    R = number | null,
    Parent = IExpenseAndIncome,
    Context = {}
  > = Resolver<R, Parent, Context>
}

export namespace ExpenseResolvers {
  export interface Resolvers<Context = {}, TypeParent = IExpense> {
    name?: NameResolver<string | null, TypeParent, Context>

    price?: PriceResolver<number | null, TypeParent, Context>

    quantity?: QuantityResolver<number | null, TypeParent, Context>

    taxRate?: TaxRateResolver<number | null, TypeParent, Context>

    date?: DateResolver<string | null, TypeParent, Context>

    user?: UserResolver<IUser | null, TypeParent, Context>
  }

  export type NameResolver<
    R = string | null,
    Parent = IExpense,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type PriceResolver<
    R = number | null,
    Parent = IExpense,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type QuantityResolver<
    R = number | null,
    Parent = IExpense,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type TaxRateResolver<
    R = number | null,
    Parent = IExpense,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type DateResolver<
    R = string | null,
    Parent = IExpense,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type UserResolver<
    R = IUser | null,
    Parent = IExpense,
    Context = {}
  > = Resolver<R, Parent, Context>
}

export namespace MutationResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    registerUser?: RegisterUserResolver<IRegisterResponse, TypeParent, Context>

    loginUser?: LoginUserResolver<IRegisterResponse, TypeParent, Context>
  }

  export type RegisterUserResolver<
    R = IRegisterResponse,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, RegisterUserArgs>
  export interface RegisterUserArgs {
    firstName: string

    lastName: string

    email: string

    password: string
  }

  export type LoginUserResolver<
    R = IRegisterResponse,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, LoginUserArgs>
  export interface LoginUserArgs {
    email: string

    password: string
  }
}

export namespace RegisterResponseResolvers {
  export interface Resolvers<Context = {}, TypeParent = IRegisterResponse> {
    success?: SuccessResolver<boolean, TypeParent, Context>

    message?: MessageResolver<string | null, TypeParent, Context>

    token?: TokenResolver<string, TypeParent, Context>
  }

  export type SuccessResolver<
    R = boolean,
    Parent = IRegisterResponse,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type MessageResolver<
    R = string | null,
    Parent = IRegisterResponse,
    Context = {}
  > = Resolver<R, Parent, Context>
  export type TokenResolver<
    R = string,
    Parent = IRegisterResponse,
    Context = {}
  > = Resolver<R, Parent, Context>
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  {}
>
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  {}
>
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  {}
>
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string | null
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<Date, any> {
  name: 'Date'
}
