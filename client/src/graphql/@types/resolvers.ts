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

  token: string;

  userId?: Maybe<string>;
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

import { GraphQLResolveInfo, GraphQLScalarTypeConfig } from "graphql";

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
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
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

type Maybe<T> = T | null | undefined;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    getUser?: GetUserResolver<User, TypeParent, Context>;

    getProjectsByUserId?: GetProjectsByUserIdResolver<
      Project[],
      TypeParent,
      Context
    >;

    getSingleProject?: GetSingleProjectResolver<
      Project | null,
      TypeParent,
      Context
    >;

    getGeneralExpenses?: GetGeneralExpensesResolver<
      GeneralExpense[] | null,
      TypeParent,
      Context
    >;

    getClientsByUser?: GetClientsByUserResolver<
      Client[] | null,
      TypeParent,
      Context
    >;

    getClientByProject?: GetClientByProjectResolver<
      Client | null,
      TypeParent,
      Context
    >;

    getSingleClient?: GetSingleClientResolver<
      Client | null,
      TypeParent,
      Context
    >;

    health?: HealthResolver<string | null, TypeParent, Context>;

    token?: TokenResolver<string, TypeParent, Context>;

    userId?: UserIdResolver<string | null, TypeParent, Context>;
  }

  export type GetUserResolver<R = User, Parent = {}, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type GetProjectsByUserIdResolver<
    R = Project[],
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, GetProjectsByUserIdArgs>;
  export interface GetProjectsByUserIdArgs {
    userId: string;
  }

  export type GetSingleProjectResolver<
    R = Project | null,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, GetSingleProjectArgs>;
  export interface GetSingleProjectArgs {
    projectId: string;
  }

  export type GetGeneralExpensesResolver<
    R = GeneralExpense[] | null,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type GetClientsByUserResolver<
    R = Client[] | null,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type GetClientByProjectResolver<
    R = Client | null,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, GetClientByProjectArgs>;
  export interface GetClientByProjectArgs {
    projectId: string;
  }

  export type GetSingleClientResolver<
    R = Client | null,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, GetSingleClientArgs>;
  export interface GetSingleClientArgs {
    clientId: string;
  }

  export type HealthResolver<
    R = string | null,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type TokenResolver<R = string, Parent = {}, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type UserIdResolver<
    R = string | null,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace UserResolvers {
  export interface Resolvers<Context = {}, TypeParent = User> {
    id?: IdResolver<string, TypeParent, Context>;

    firstName?: FirstNameResolver<string, TypeParent, Context>;

    lastName?: LastNameResolver<string, TypeParent, Context>;

    email?: EmailResolver<string, TypeParent, Context>;

    projects?: ProjectsResolver<Project[] | null, TypeParent, Context>;

    expenses?: ExpensesResolver<GeneralExpense[] | null, TypeParent, Context>;

    clients?: ClientsResolver<Client[] | null, TypeParent, Context>;

    btw?: BtwResolver<string | null, TypeParent, Context>;

    kvk?: KvkResolver<string | null, TypeParent, Context>;

    iban?: IbanResolver<string | null, TypeParent, Context>;

    phone?: PhoneResolver<string | null, TypeParent, Context>;

    streetAddress?: StreetAddressResolver<string | null, TypeParent, Context>;

    postalCode?: PostalCodeResolver<string | null, TypeParent, Context>;

    city?: CityResolver<string | null, TypeParent, Context>;

    createdAt?: CreatedAtResolver<Date | null, TypeParent, Context>;

    updatedAt?: UpdatedAtResolver<Date | null, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = User, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type FirstNameResolver<
    R = string,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type LastNameResolver<
    R = string,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type EmailResolver<R = string, Parent = User, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type ProjectsResolver<
    R = Project[] | null,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ExpensesResolver<
    R = GeneralExpense[] | null,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ClientsResolver<
    R = Client[] | null,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type BtwResolver<
    R = string | null,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type KvkResolver<
    R = string | null,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type IbanResolver<
    R = string | null,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type PhoneResolver<
    R = string | null,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type StreetAddressResolver<
    R = string | null,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type PostalCodeResolver<
    R = string | null,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type CityResolver<
    R = string | null,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type CreatedAtResolver<
    R = Date | null,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type UpdatedAtResolver<
    R = Date | null,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace ProjectResolvers {
  export interface Resolvers<Context = {}, TypeParent = Project> {
    id?: IdResolver<string, TypeParent, Context>;

    invoiceNumber?: InvoiceNumberResolver<string, TypeParent, Context>;

    invoiceDate?: InvoiceDateResolver<Date | null, TypeParent, Context>;

    name?: NameResolver<string, TypeParent, Context>;

    projectDate?: ProjectDateResolver<Date | null, TypeParent, Context>;

    streetAddress?: StreetAddressResolver<string | null, TypeParent, Context>;

    city?: CityResolver<string | null, TypeParent, Context>;

    link?: LinkResolver<string | null, TypeParent, Context>;

    status?: StatusResolver<InvoiceStatus, TypeParent, Context>;

    user?: UserResolver<string, TypeParent, Context>;

    expenses?: ExpensesResolver<ExpenseAndIncome[] | null, TypeParent, Context>;

    incomes?: IncomesResolver<ExpenseAndIncome[] | null, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = Project, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type InvoiceNumberResolver<
    R = string,
    Parent = Project,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type InvoiceDateResolver<
    R = Date | null,
    Parent = Project,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type NameResolver<
    R = string,
    Parent = Project,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ProjectDateResolver<
    R = Date | null,
    Parent = Project,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type StreetAddressResolver<
    R = string | null,
    Parent = Project,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type CityResolver<
    R = string | null,
    Parent = Project,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type LinkResolver<
    R = string | null,
    Parent = Project,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type StatusResolver<
    R = InvoiceStatus,
    Parent = Project,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type UserResolver<
    R = string,
    Parent = Project,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ExpensesResolver<
    R = ExpenseAndIncome[] | null,
    Parent = Project,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type IncomesResolver<
    R = ExpenseAndIncome[] | null,
    Parent = Project,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace ExpenseAndIncomeResolvers {
  export interface Resolvers<Context = {}, TypeParent = ExpenseAndIncome> {
    name?: NameResolver<string | null, TypeParent, Context>;

    price?: PriceResolver<string | null, TypeParent, Context>;

    quantity?: QuantityResolver<number | null, TypeParent, Context>;

    taxRate?: TaxRateResolver<number | null, TypeParent, Context>;
  }

  export type NameResolver<
    R = string | null,
    Parent = ExpenseAndIncome,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type PriceResolver<
    R = string | null,
    Parent = ExpenseAndIncome,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type QuantityResolver<
    R = number | null,
    Parent = ExpenseAndIncome,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type TaxRateResolver<
    R = number | null,
    Parent = ExpenseAndIncome,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace GeneralExpenseResolvers {
  export interface Resolvers<Context = {}, TypeParent = GeneralExpense> {
    name?: NameResolver<string, TypeParent, Context>;

    price?: PriceResolver<string, TypeParent, Context>;

    quantity?: QuantityResolver<number, TypeParent, Context>;

    taxRate?: TaxRateResolver<number, TypeParent, Context>;

    date?: DateResolver<string, TypeParent, Context>;

    user?: UserResolver<string, TypeParent, Context>;
  }

  export type NameResolver<
    R = string,
    Parent = GeneralExpense,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type PriceResolver<
    R = string,
    Parent = GeneralExpense,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type QuantityResolver<
    R = number,
    Parent = GeneralExpense,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type TaxRateResolver<
    R = number,
    Parent = GeneralExpense,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type DateResolver<
    R = string,
    Parent = GeneralExpense,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type UserResolver<
    R = string,
    Parent = GeneralExpense,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace ClientResolvers {
  export interface Resolvers<Context = {}, TypeParent = Client> {
    id?: IdResolver<string, TypeParent, Context>;

    firstName?: FirstNameResolver<string | null, TypeParent, Context>;

    lastName?: LastNameResolver<string | null, TypeParent, Context>;

    email?: EmailResolver<string | null, TypeParent, Context>;

    phone?: PhoneResolver<string | null, TypeParent, Context>;

    user?: UserResolver<string | null, TypeParent, Context>;

    projects?: ProjectsResolver<string[] | null, TypeParent, Context>;

    streetAddress?: StreetAddressResolver<string | null, TypeParent, Context>;

    postalCode?: PostalCodeResolver<string | null, TypeParent, Context>;

    city?: CityResolver<string | null, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = Client, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type FirstNameResolver<
    R = string | null,
    Parent = Client,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type LastNameResolver<
    R = string | null,
    Parent = Client,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type EmailResolver<
    R = string | null,
    Parent = Client,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type PhoneResolver<
    R = string | null,
    Parent = Client,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type UserResolver<
    R = string | null,
    Parent = Client,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ProjectsResolver<
    R = string[] | null,
    Parent = Client,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type StreetAddressResolver<
    R = string | null,
    Parent = Client,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type PostalCodeResolver<
    R = string | null,
    Parent = Client,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type CityResolver<
    R = string | null,
    Parent = Client,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    registerUser?: RegisterUserResolver<RegisterResponse, TypeParent, Context>;

    loginUser?: LoginUserResolver<RegisterResponse, TypeParent, Context>;

    updateUser?: UpdateUserResolver<UpdateUserResponse, TypeParent, Context>;

    changePassword?: ChangePasswordResolver<
      RegisterResponse,
      TypeParent,
      Context
    >;

    updateProject?: UpdateProjectResolver<
      MutationProjectResponse,
      TypeParent,
      Context
    >;

    addProject?: AddProjectResolver<
      MutationProjectResponse | null,
      TypeParent,
      Context
    >;

    deleteProject?: DeleteProjectResolver<
      MutationProjectResponse | null,
      TypeParent,
      Context
    >;

    addGeneralExpense?: AddGeneralExpenseResolver<
      AddGeneralExpensesResponse,
      TypeParent,
      Context
    >;

    addClient?: AddClientResolver<
      ClientMutationResponse | null,
      TypeParent,
      Context
    >;

    updateClient?: UpdateClientResolver<
      ClientMutationResponse | null,
      TypeParent,
      Context
    >;

    updateClientProject?: UpdateClientProjectResolver<
      ClientMutationResponse | null,
      TypeParent,
      Context
    >;

    removeClientFromProject?: RemoveClientFromProjectResolver<
      ClientMutationResponse | null,
      TypeParent,
      Context
    >;

    deleteClient?: DeleteClientResolver<
      ClientMutationResponse | null,
      TypeParent,
      Context
    >;

    downloadInvoice?: DownloadInvoiceResolver<
      GenerateInvoiceResponse | null,
      TypeParent,
      Context
    >;
  }

  export type RegisterUserResolver<
    R = RegisterResponse,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, RegisterUserArgs>;
  export interface RegisterUserArgs {
    firstName: string;

    lastName: string;

    email: string;

    password: string;
  }

  export type LoginUserResolver<
    R = RegisterResponse,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, LoginUserArgs>;
  export interface LoginUserArgs {
    email: string;

    password: string;
  }

  export type UpdateUserResolver<
    R = UpdateUserResponse,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, UpdateUserArgs>;
  export interface UpdateUserArgs {
    data: UpdateUserInput;
  }

  export type ChangePasswordResolver<
    R = RegisterResponse,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, ChangePasswordArgs>;
  export interface ChangePasswordArgs {
    email: string;

    password: string;
  }

  export type UpdateProjectResolver<
    R = MutationProjectResponse,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, UpdateProjectArgs>;
  export interface UpdateProjectArgs {
    projectId: string;

    data: ProjectInput;
  }

  export type AddProjectResolver<
    R = MutationProjectResponse | null,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, AddProjectArgs>;
  export interface AddProjectArgs {
    data: ProjectInput;
  }

  export type DeleteProjectResolver<
    R = MutationProjectResponse | null,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, DeleteProjectArgs>;
  export interface DeleteProjectArgs {
    projectId: string;
  }

  export type AddGeneralExpenseResolver<
    R = AddGeneralExpensesResponse,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, AddGeneralExpenseArgs>;
  export interface AddGeneralExpenseArgs {
    data: GeneralExpenseInput;
  }

  export type AddClientResolver<
    R = ClientMutationResponse | null,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, AddClientArgs>;
  export interface AddClientArgs {
    data: ClientInput;
  }

  export type UpdateClientResolver<
    R = ClientMutationResponse | null,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, UpdateClientArgs>;
  export interface UpdateClientArgs {
    clientId: string;

    data: ClientInput;
  }

  export type UpdateClientProjectResolver<
    R = ClientMutationResponse | null,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, UpdateClientProjectArgs>;
  export interface UpdateClientProjectArgs {
    projectId: string;

    clientId: string;
  }

  export type RemoveClientFromProjectResolver<
    R = ClientMutationResponse | null,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, RemoveClientFromProjectArgs>;
  export interface RemoveClientFromProjectArgs {
    projectId: string;

    clientId: string;
  }

  export type DeleteClientResolver<
    R = ClientMutationResponse | null,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, DeleteClientArgs>;
  export interface DeleteClientArgs {
    clientId: string;
  }

  export type DownloadInvoiceResolver<
    R = GenerateInvoiceResponse | null,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, DownloadInvoiceArgs>;
  export interface DownloadInvoiceArgs {
    projectId: string;
  }
}

export namespace RegisterResponseResolvers {
  export interface Resolvers<Context = {}, TypeParent = RegisterResponse> {
    success?: SuccessResolver<boolean, TypeParent, Context>;

    message?: MessageResolver<string | null, TypeParent, Context>;

    token?: TokenResolver<string, TypeParent, Context>;
  }

  export type SuccessResolver<
    R = boolean,
    Parent = RegisterResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type MessageResolver<
    R = string | null,
    Parent = RegisterResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type TokenResolver<
    R = string,
    Parent = RegisterResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace UpdateUserResponseResolvers {
  export interface Resolvers<Context = {}, TypeParent = UpdateUserResponse> {
    message?: MessageResolver<string | null, TypeParent, Context>;

    user?: UserResolver<User, TypeParent, Context>;
  }

  export type MessageResolver<
    R = string | null,
    Parent = UpdateUserResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type UserResolver<
    R = User,
    Parent = UpdateUserResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace MutationProjectResponseResolvers {
  export interface Resolvers<
    Context = {},
    TypeParent = MutationProjectResponse
  > {
    success?: SuccessResolver<boolean, TypeParent, Context>;

    message?: MessageResolver<string | null, TypeParent, Context>;

    project?: ProjectResolver<Project, TypeParent, Context>;

    client?: ClientResolver<Client | null, TypeParent, Context>;
  }

  export type SuccessResolver<
    R = boolean,
    Parent = MutationProjectResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type MessageResolver<
    R = string | null,
    Parent = MutationProjectResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ProjectResolver<
    R = Project,
    Parent = MutationProjectResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ClientResolver<
    R = Client | null,
    Parent = MutationProjectResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace AddGeneralExpensesResponseResolvers {
  export interface Resolvers<
    Context = {},
    TypeParent = AddGeneralExpensesResponse
  > {
    message?: MessageResolver<string | null, TypeParent, Context>;

    generalExpense?: GeneralExpenseResolver<
      GeneralExpense | null,
      TypeParent,
      Context
    >;
  }

  export type MessageResolver<
    R = string | null,
    Parent = AddGeneralExpensesResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type GeneralExpenseResolver<
    R = GeneralExpense | null,
    Parent = AddGeneralExpensesResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace ClientMutationResponseResolvers {
  export interface Resolvers<
    Context = {},
    TypeParent = ClientMutationResponse
  > {
    message?: MessageResolver<string | null, TypeParent, Context>;

    client?: ClientResolver<Client | null, TypeParent, Context>;
  }

  export type MessageResolver<
    R = string | null,
    Parent = ClientMutationResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type ClientResolver<
    R = Client | null,
    Parent = ClientMutationResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace GenerateInvoiceResponseResolvers {
  export interface Resolvers<
    Context = {},
    TypeParent = GenerateInvoiceResponse
  > {
    message?: MessageResolver<string | null, TypeParent, Context>;

    data?: DataResolver<Blob | null, TypeParent, Context>;
  }

  export type MessageResolver<
    R = string | null,
    Parent = GenerateInvoiceResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type DataResolver<
    R = Blob | null,
    Parent = GenerateInvoiceResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  {}
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  {}
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  {}
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string | null;
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<Date, any> {
  name: "Date";
}
export interface BlobScalarConfig extends GraphQLScalarTypeConfig<Blob, any> {
  name: "Blob";
}
