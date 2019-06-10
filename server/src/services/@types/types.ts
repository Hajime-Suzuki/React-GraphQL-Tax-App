import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";
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

export type IAddGeneralExpensesResponse = {
  __typename?: "AddGeneralExpensesResponse";
  message?: Maybe<Scalars["String"]>;
  generalExpense?: Maybe<IGeneralExpense>;
};

export type IClient = {
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

export type IClientInput = {
  id?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  streetAddress?: Maybe<Scalars["String"]>;
  postalCode?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
};

export type IClientMutationResponse = {
  __typename?: "ClientMutationResponse";
  message?: Maybe<Scalars["String"]>;
  client?: Maybe<IClient>;
};

export type IExpenseAndIncome = {
  __typename?: "ExpenseAndIncome";
  name?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["String"]>;
  quantity?: Maybe<Scalars["Int"]>;
  taxRate?: Maybe<Scalars["Int"]>;
};

export type IExpenseAndIncomeInput = {
  name?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["String"]>;
  quantity?: Maybe<Scalars["Int"]>;
  taxRate?: Maybe<Scalars["Int"]>;
};

export type IGeneralExpense = {
  __typename?: "GeneralExpense";
  name: Scalars["String"];
  price: Scalars["String"];
  quantity: Scalars["Int"];
  taxRate: Scalars["Int"];
  date: Scalars["String"];
  user: Scalars["String"];
};

export type IGeneralExpenseInput = {
  name: Scalars["String"];
  price: Scalars["String"];
  quantity: Scalars["Int"];
  taxRate: Scalars["Int"];
  date: Scalars["String"];
};

export type IGenerateInvoiceResponse = {
  __typename?: "GenerateInvoiceResponse";
  message?: Maybe<Scalars["String"]>;
  data?: Maybe<Scalars["Blob"]>;
};

export type IGetProjectsFilter = {
  year?: Maybe<Scalars["Int"]>;
};

export enum IInvoice_Status {
  None = "none",
  Invoice = "invoice",
  Paid = "paid"
}

export type IMutation = {
  __typename?: "Mutation";
  registerUser: IRegisterResponse;
  loginUser: IRegisterResponse;
  updateUser: IUpdateUserResponse;
  changePassword: IRegisterResponse;
  updateProject: IMutationProjectResponse;
  addProject?: Maybe<IMutationProjectResponse>;
  deleteProject?: Maybe<IMutationProjectResponse>;
  addGeneralExpense: IAddGeneralExpensesResponse;
  addClient?: Maybe<IClientMutationResponse>;
  updateClient?: Maybe<IClientMutationResponse>;
  updateClientProject?: Maybe<IClientMutationResponse>;
  removeClientFromProject?: Maybe<IClientMutationResponse>;
  deleteClient?: Maybe<IClientMutationResponse>;
  downloadInvoice?: Maybe<IGenerateInvoiceResponse>;
};

export type IMutationRegisterUserArgs = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type IMutationLoginUserArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type IMutationUpdateUserArgs = {
  data: IUpdateUserInput;
};

export type IMutationChangePasswordArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type IMutationUpdateProjectArgs = {
  projectId: Scalars["String"];
  data: IProjectInput;
};

export type IMutationAddProjectArgs = {
  data: IProjectInput;
};

export type IMutationDeleteProjectArgs = {
  projectId: Scalars["String"];
};

export type IMutationAddGeneralExpenseArgs = {
  data: IGeneralExpenseInput;
};

export type IMutationAddClientArgs = {
  data: IClientInput;
};

export type IMutationUpdateClientArgs = {
  clientId: Scalars["String"];
  data: IClientInput;
};

export type IMutationUpdateClientProjectArgs = {
  projectId: Scalars["String"];
  clientId: Scalars["String"];
};

export type IMutationRemoveClientFromProjectArgs = {
  projectId: Scalars["String"];
  clientId: Scalars["String"];
};

export type IMutationDeleteClientArgs = {
  clientId: Scalars["String"];
};

export type IMutationDownloadInvoiceArgs = {
  projectId: Scalars["String"];
};

export type IMutationProjectResponse = {
  __typename?: "MutationProjectResponse";
  success: Scalars["Boolean"];
  message?: Maybe<Scalars["String"]>;
  project: IProject;
  client?: Maybe<IClient>;
};

export type IProject = {
  __typename?: "Project";
  id: Scalars["String"];
  invoiceNumber: Scalars["String"];
  invoiceDate?: Maybe<Scalars["Date"]>;
  name: Scalars["String"];
  projectDate?: Maybe<Scalars["Date"]>;
  streetAddress?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  link?: Maybe<Scalars["String"]>;
  status: IInvoice_Status;
  user: Scalars["String"];
  expenses: Array<IExpenseAndIncome>;
  incomes: Array<IExpenseAndIncome>;
};

export type IProjectInput = {
  invoiceNumber?: Maybe<Scalars["String"]>;
  invoiceDate?: Maybe<Scalars["String"]>;
  projectDate?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["String"]>;
  status?: Maybe<IInvoice_Status>;
  client?: Maybe<IClientInput>;
  expenses?: Maybe<Array<IExpenseAndIncomeInput>>;
  incomes?: Maybe<Array<IExpenseAndIncomeInput>>;
};

export type IQuery = {
  __typename?: "Query";
  getUser: IUser;
  getProjectsByUserId: Array<IProject>;
  getProjects: Array<IProject>;
  getSingleProject?: Maybe<IProject>;
  getGeneralExpenses?: Maybe<Array<IGeneralExpense>>;
  getClientsByUser?: Maybe<Array<IClient>>;
  getClientByProject?: Maybe<IClient>;
  getSingleClient?: Maybe<IClient>;
  health?: Maybe<Scalars["String"]>;
};

export type IQueryGetProjectsByUserIdArgs = {
  userId: Scalars["String"];
};

export type IQueryGetProjectsArgs = {
  filter?: Maybe<IGetProjectsFilter>;
  sortOption?: Maybe<ISortOption>;
};

export type IQueryGetSingleProjectArgs = {
  projectId: Scalars["String"];
};

export type IQueryGetClientByProjectArgs = {
  projectId: Scalars["String"];
};

export type IQueryGetSingleClientArgs = {
  clientId: Scalars["String"];
};

export type IRegisterResponse = {
  __typename?: "RegisterResponse";
  success: Scalars["Boolean"];
  message?: Maybe<Scalars["String"]>;
  token: Scalars["String"];
};

export type ISortOption = {
  invoiceDate?: Maybe<Scalars["Int"]>;
};

export type IUpdateUserInput = {
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

export type IUpdateUserResponse = {
  __typename?: "UpdateUserResponse";
  message?: Maybe<Scalars["String"]>;
  user: IUser;
};

export type IUser = {
  __typename?: "User";
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  projects?: Maybe<Array<IProject>>;
  expenses?: Maybe<Array<IGeneralExpense>>;
  clients?: Maybe<Array<IClient>>;
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

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = {
  Query: {};
  User: IUser;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Project: IProject;
  Date: Scalars["Date"];
  INVOICE_STATUS: IInvoice_Status;
  ExpenseAndIncome: IExpenseAndIncome;
  Int: Scalars["Int"];
  GeneralExpense: IGeneralExpense;
  Client: IClient;
  GetProjectsFilter: IGetProjectsFilter;
  SortOption: ISortOption;
  Mutation: {};
  RegisterResponse: IRegisterResponse;
  Boolean: Scalars["Boolean"];
  UpdateUserInput: IUpdateUserInput;
  UpdateUserResponse: IUpdateUserResponse;
  ProjectInput: IProjectInput;
  ClientInput: IClientInput;
  ExpenseAndIncomeInput: IExpenseAndIncomeInput;
  MutationProjectResponse: IMutationProjectResponse;
  GeneralExpenseInput: IGeneralExpenseInput;
  AddGeneralExpensesResponse: IAddGeneralExpensesResponse;
  ClientMutationResponse: IClientMutationResponse;
  GenerateInvoiceResponse: IGenerateInvoiceResponse;
  Blob: Scalars["Blob"];
};

export type IAddGeneralExpensesResponseResolvers<
  ContextType = any,
  ParentType = IResolversTypes["AddGeneralExpensesResponse"]
> = {
  message?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  generalExpense?: Resolver<
    Maybe<IResolversTypes["GeneralExpense"]>,
    ParentType,
    ContextType
  >;
};

export interface IBlobScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["Blob"], any> {
  name: "Blob";
}

export type IClientResolvers<
  ContextType = any,
  ParentType = IResolversTypes["Client"]
> = {
  id?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  firstName?: Resolver<
    Maybe<IResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  lastName?: Resolver<
    Maybe<IResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  email?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  phone?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  user?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  projects?: Resolver<
    Maybe<Array<IResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  streetAddress?: Resolver<
    Maybe<IResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  postalCode?: Resolver<
    Maybe<IResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  city?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
};

export type IClientMutationResponseResolvers<
  ContextType = any,
  ParentType = IResolversTypes["ClientMutationResponse"]
> = {
  message?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  client?: Resolver<Maybe<IResolversTypes["Client"]>, ParentType, ContextType>;
};

export interface IDateScalarConfig
  extends GraphQLScalarTypeConfig<IResolversTypes["Date"], any> {
  name: "Date";
}

export type IExpenseAndIncomeResolvers<
  ContextType = any,
  ParentType = IResolversTypes["ExpenseAndIncome"]
> = {
  name?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  price?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<IResolversTypes["Int"]>, ParentType, ContextType>;
  taxRate?: Resolver<Maybe<IResolversTypes["Int"]>, ParentType, ContextType>;
};

export type IGeneralExpenseResolvers<
  ContextType = any,
  ParentType = IResolversTypes["GeneralExpense"]
> = {
  name?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  price?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  quantity?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  taxRate?: Resolver<IResolversTypes["Int"], ParentType, ContextType>;
  date?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
};

export type IGenerateInvoiceResponseResolvers<
  ContextType = any,
  ParentType = IResolversTypes["GenerateInvoiceResponse"]
> = {
  message?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  data?: Resolver<Maybe<IResolversTypes["Blob"]>, ParentType, ContextType>;
};

export type IMutationResolvers<
  ContextType = any,
  ParentType = IResolversTypes["Mutation"]
> = {
  registerUser?: Resolver<
    IResolversTypes["RegisterResponse"],
    ParentType,
    ContextType,
    IMutationRegisterUserArgs
  >;
  loginUser?: Resolver<
    IResolversTypes["RegisterResponse"],
    ParentType,
    ContextType,
    IMutationLoginUserArgs
  >;
  updateUser?: Resolver<
    IResolversTypes["UpdateUserResponse"],
    ParentType,
    ContextType,
    IMutationUpdateUserArgs
  >;
  changePassword?: Resolver<
    IResolversTypes["RegisterResponse"],
    ParentType,
    ContextType,
    IMutationChangePasswordArgs
  >;
  updateProject?: Resolver<
    IResolversTypes["MutationProjectResponse"],
    ParentType,
    ContextType,
    IMutationUpdateProjectArgs
  >;
  addProject?: Resolver<
    Maybe<IResolversTypes["MutationProjectResponse"]>,
    ParentType,
    ContextType,
    IMutationAddProjectArgs
  >;
  deleteProject?: Resolver<
    Maybe<IResolversTypes["MutationProjectResponse"]>,
    ParentType,
    ContextType,
    IMutationDeleteProjectArgs
  >;
  addGeneralExpense?: Resolver<
    IResolversTypes["AddGeneralExpensesResponse"],
    ParentType,
    ContextType,
    IMutationAddGeneralExpenseArgs
  >;
  addClient?: Resolver<
    Maybe<IResolversTypes["ClientMutationResponse"]>,
    ParentType,
    ContextType,
    IMutationAddClientArgs
  >;
  updateClient?: Resolver<
    Maybe<IResolversTypes["ClientMutationResponse"]>,
    ParentType,
    ContextType,
    IMutationUpdateClientArgs
  >;
  updateClientProject?: Resolver<
    Maybe<IResolversTypes["ClientMutationResponse"]>,
    ParentType,
    ContextType,
    IMutationUpdateClientProjectArgs
  >;
  removeClientFromProject?: Resolver<
    Maybe<IResolversTypes["ClientMutationResponse"]>,
    ParentType,
    ContextType,
    IMutationRemoveClientFromProjectArgs
  >;
  deleteClient?: Resolver<
    Maybe<IResolversTypes["ClientMutationResponse"]>,
    ParentType,
    ContextType,
    IMutationDeleteClientArgs
  >;
  downloadInvoice?: Resolver<
    Maybe<IResolversTypes["GenerateInvoiceResponse"]>,
    ParentType,
    ContextType,
    IMutationDownloadInvoiceArgs
  >;
};

export type IMutationProjectResponseResolvers<
  ContextType = any,
  ParentType = IResolversTypes["MutationProjectResponse"]
> = {
  success?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  project?: Resolver<IResolversTypes["Project"], ParentType, ContextType>;
  client?: Resolver<Maybe<IResolversTypes["Client"]>, ParentType, ContextType>;
};

export type IProjectResolvers<
  ContextType = any,
  ParentType = IResolversTypes["Project"]
> = {
  id?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  invoiceNumber?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  invoiceDate?: Resolver<
    Maybe<IResolversTypes["Date"]>,
    ParentType,
    ContextType
  >;
  name?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  projectDate?: Resolver<
    Maybe<IResolversTypes["Date"]>,
    ParentType,
    ContextType
  >;
  streetAddress?: Resolver<
    Maybe<IResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  city?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  link?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  status?: Resolver<IResolversTypes["INVOICE_STATUS"], ParentType, ContextType>;
  user?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  expenses?: Resolver<
    Array<IResolversTypes["ExpenseAndIncome"]>,
    ParentType,
    ContextType
  >;
  incomes?: Resolver<
    Array<IResolversTypes["ExpenseAndIncome"]>,
    ParentType,
    ContextType
  >;
};

export type IQueryResolvers<
  ContextType = any,
  ParentType = IResolversTypes["Query"]
> = {
  getUser?: Resolver<IResolversTypes["User"], ParentType, ContextType>;
  getProjectsByUserId?: Resolver<
    Array<IResolversTypes["Project"]>,
    ParentType,
    ContextType,
    IQueryGetProjectsByUserIdArgs
  >;
  getProjects?: Resolver<
    Array<IResolversTypes["Project"]>,
    ParentType,
    ContextType,
    IQueryGetProjectsArgs
  >;
  getSingleProject?: Resolver<
    Maybe<IResolversTypes["Project"]>,
    ParentType,
    ContextType,
    IQueryGetSingleProjectArgs
  >;
  getGeneralExpenses?: Resolver<
    Maybe<Array<IResolversTypes["GeneralExpense"]>>,
    ParentType,
    ContextType
  >;
  getClientsByUser?: Resolver<
    Maybe<Array<IResolversTypes["Client"]>>,
    ParentType,
    ContextType
  >;
  getClientByProject?: Resolver<
    Maybe<IResolversTypes["Client"]>,
    ParentType,
    ContextType,
    IQueryGetClientByProjectArgs
  >;
  getSingleClient?: Resolver<
    Maybe<IResolversTypes["Client"]>,
    ParentType,
    ContextType,
    IQueryGetSingleClientArgs
  >;
  health?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
};

export type IRegisterResponseResolvers<
  ContextType = any,
  ParentType = IResolversTypes["RegisterResponse"]
> = {
  success?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  token?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
};

export type IUpdateUserResponseResolvers<
  ContextType = any,
  ParentType = IResolversTypes["UpdateUserResponse"]
> = {
  message?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  user?: Resolver<IResolversTypes["User"], ParentType, ContextType>;
};

export type IUserResolvers<
  ContextType = any,
  ParentType = IResolversTypes["User"]
> = {
  id?: Resolver<IResolversTypes["ID"], ParentType, ContextType>;
  firstName?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  lastName?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<IResolversTypes["String"], ParentType, ContextType>;
  projects?: Resolver<
    Maybe<Array<IResolversTypes["Project"]>>,
    ParentType,
    ContextType
  >;
  expenses?: Resolver<
    Maybe<Array<IResolversTypes["GeneralExpense"]>>,
    ParentType,
    ContextType
  >;
  clients?: Resolver<
    Maybe<Array<IResolversTypes["Client"]>>,
    ParentType,
    ContextType
  >;
  btw?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  kvk?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  iban?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  phone?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  streetAddress?: Resolver<
    Maybe<IResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  postalCode?: Resolver<
    Maybe<IResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  city?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<IResolversTypes["Date"]>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<IResolversTypes["Date"]>, ParentType, ContextType>;
};

export type IResolvers<ContextType = any> = {
  AddGeneralExpensesResponse?: IAddGeneralExpensesResponseResolvers<
    ContextType
  >;
  Blob?: GraphQLScalarType;
  Client?: IClientResolvers<ContextType>;
  ClientMutationResponse?: IClientMutationResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  ExpenseAndIncome?: IExpenseAndIncomeResolvers<ContextType>;
  GeneralExpense?: IGeneralExpenseResolvers<ContextType>;
  GenerateInvoiceResponse?: IGenerateInvoiceResponseResolvers<ContextType>;
  Mutation?: IMutationResolvers<ContextType>;
  MutationProjectResponse?: IMutationProjectResponseResolvers<ContextType>;
  Project?: IProjectResolvers<ContextType>;
  Query?: IQueryResolvers<ContextType>;
  RegisterResponse?: IRegisterResponseResolvers<ContextType>;
  UpdateUserResponse?: IUpdateUserResponseResolvers<ContextType>;
  User?: IUserResolvers<ContextType>;
};
