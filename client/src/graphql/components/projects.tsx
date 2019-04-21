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
// Documents
// ====================================================

export namespace GetProjectOverview {
  export type Variables = {
    userId: string;
  };

  export type Query = {
    __typename?: "Query";

    projects: Projects[];
  };

  export type Projects = {
    __typename?: "Project";

    incomes: Maybe<Incomes[]>;

    expenses: Maybe<Expenses[]>;
  } & BasicInfoFragment.Fragment;

  export type Incomes = PriceFragment.Fragment;

  export type Expenses = PriceFragment.Fragment;
}

export namespace GetSingleProject {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    project: Maybe<Project>;

    client: Maybe<Client>;
  };

  export type Project = {
    __typename?: "Project";

    invoiceNumber: string;

    incomes: Maybe<Incomes[]>;

    expenses: Maybe<Expenses[]>;
  } & BasicInfoFragment.Fragment;

  export type Incomes = {
    __typename?: "ExpenseAndIncome";

    name: Maybe<string>;
  } & PriceFragment.Fragment;

  export type Expenses = {
    __typename?: "ExpenseAndIncome";

    name: Maybe<string>;
  } & PriceFragment.Fragment;

  export type Client = {
    __typename?: "Client";

    streetAddress: Maybe<string>;

    postalCode: Maybe<string>;

    city: Maybe<string>;
  } & ClientFragment.Fragment;
}

export namespace UpdateStatus {
  export type Variables = {
    projectId: string;
    data: ProjectInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updateProject: UpdateProject;
  };

  export type UpdateProject = {
    __typename?: "MutationProjectResponse";

    success: boolean;

    message: Maybe<string>;

    project: Project;
  };

  export type Project = {
    __typename?: "Project";

    id: string;

    status: InvoiceStatus;
  };
}

export namespace AddProject {
  export type Variables = {
    data: ProjectInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    addProject: Maybe<AddProject>;
  };

  export type AddProject = {
    __typename?: "MutationProjectResponse";

    success: boolean;

    message: Maybe<string>;

    project: Project;

    client: Maybe<Client>;
  };

  export type Project = {
    __typename?: "Project";

    invoiceNumber: string;

    incomes: Maybe<Incomes[]>;

    expenses: Maybe<Expenses[]>;
  } & BasicInfoFragment.Fragment;

  export type Incomes = {
    __typename?: "ExpenseAndIncome";

    name: Maybe<string>;
  } & PriceFragment.Fragment;

  export type Expenses = {
    __typename?: "ExpenseAndIncome";

    name: Maybe<string>;
  } & PriceFragment.Fragment;

  export type Client = ClientFragment.Fragment;
}

export namespace UpdateIncomesAndExpenses {
  export type Variables = {
    projectId: string;
    data: ProjectInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updateProject: UpdateProject;
  };

  export type UpdateProject = {
    __typename?: "MutationProjectResponse";

    success: boolean;

    message: Maybe<string>;

    project: Project;
  };

  export type Project = {
    __typename?: "Project";

    id: string;

    incomes: Maybe<Incomes[]>;

    expenses: Maybe<Expenses[]>;
  };

  export type Incomes = {
    __typename?: "ExpenseAndIncome";

    name: Maybe<string>;
  } & PriceFragment.Fragment;

  export type Expenses = {
    __typename?: "ExpenseAndIncome";

    name: Maybe<string>;
  } & PriceFragment.Fragment;
}

export namespace UpdateBasicInfo {
  export type Variables = {
    projectId: string;
    data: ProjectInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updateProject: UpdateProject;
  };

  export type UpdateProject = {
    __typename?: "MutationProjectResponse";

    success: boolean;

    message: Maybe<string>;

    project: Project;
  };

  export type Project = {
    __typename?: "Project";

    invoiceNumber: string;
  } & BasicInfoFragment.Fragment;
}

export namespace DeleteProject {
  export type Variables = {
    projectId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    deleteProject: Maybe<DeleteProject>;
  };

  export type DeleteProject = {
    __typename?: "MutationProjectResponse";

    message: Maybe<string>;

    project: Project;
  };

  export type Project = {
    __typename?: "Project";

    id: string;
  };
}

export namespace DownloadInvoice {
  export type Variables = {
    projectId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    downloadInvoice: Maybe<DownloadInvoice>;
  };

  export type DownloadInvoice = {
    __typename?: "GenerateInvoiceResponse";

    message: Maybe<string>;

    data: Maybe<Blob>;
  };
}

export namespace ClientFragment {
  export type Fragment = {
    __typename?: "Client";

    id: string;

    firstName: Maybe<string>;

    lastName: Maybe<string>;

    email: Maybe<string>;

    phone: Maybe<string>;
  };
}

export namespace PriceFragment {
  export type Fragment = {
    __typename?: "ExpenseAndIncome";

    price: Maybe<string>;

    quantity: Maybe<number>;

    taxRate: Maybe<number>;
  };
}

export namespace BasicInfoFragment {
  export type Fragment = {
    __typename?: "Project";

    id: string;

    name: string;

    projectDate: Maybe<Date>;

    invoiceDate: Maybe<Date>;

    status: InvoiceStatus;
  };
}

type Maybe<T> = T | null;
export type AddGeneralExpensesResponse = {
  message?: Maybe<string>;
  generalExpense?: Maybe<GeneralExpense>;
};

export type Blob = any;

export type Client = {
  id: string;
  firstName?: Maybe<string>;
  lastName?: Maybe<string>;
  email?: Maybe<string>;
  phone?: Maybe<string>;
  user?: Maybe<string>;
  projects?: Maybe<Array<string>>;
  streetAddress?: Maybe<string>;
  postalCode?: Maybe<string>;
  city?: Maybe<string>;
};

export type ClientInput = {
  id: Maybe<string>;
  firstName: Maybe<string>;
  lastName: Maybe<string>;
  email: Maybe<string>;
  phone: Maybe<string>;
  streetAddress: Maybe<string>;
  postalCode: Maybe<string>;
  city: Maybe<string>;
};

export type ClientMutationResponse = {
  message?: Maybe<string>;
  client?: Maybe<Client>;
};

export type Date = any;

export type ExpenseAndIncome = {
  name?: Maybe<string>;
  price?: Maybe<string>;
  quantity?: Maybe<number>;
  taxRate?: Maybe<number>;
};

export type ExpenseAndIncomeInput = {
  name: Maybe<string>;
  price: Maybe<string>;
  quantity: Maybe<number>;
  taxRate: Maybe<number>;
};

export type GeneralExpense = {
  name: string;
  price: string;
  quantity: number;
  taxRate: number;
  date: string;
  user: string;
};

export type GeneralExpenseInput = {
  name: string;
  price: string;
  quantity: number;
  taxRate: number;
  date: string;
};

export type GenerateInvoiceResponse = {
  message?: Maybe<string>;
  data?: Maybe<Blob>;
};

export enum Invoice_Status {
  None = "none",
  Invoice = "invoice",
  Paid = "paid"
}

export type Mutation = {
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
};

export type MutationRegisterUserArgs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type MutationLoginUserArgs = {
  email: string;
  password: string;
};

export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type MutationChangePasswordArgs = {
  email: string;
  password: string;
};

export type MutationUpdateProjectArgs = {
  projectId: string;
  data: ProjectInput;
};

export type MutationAddProjectArgs = {
  data: ProjectInput;
};

export type MutationDeleteProjectArgs = {
  projectId: string;
};

export type MutationAddGeneralExpenseArgs = {
  data: GeneralExpenseInput;
};

export type MutationAddClientArgs = {
  data: ClientInput;
};

export type MutationUpdateClientArgs = {
  clientId: string;
  data: ClientInput;
};

export type MutationUpdateClientProjectArgs = {
  projectId: string;
  clientId: string;
};

export type MutationRemoveClientFromProjectArgs = {
  projectId: string;
  clientId: string;
};

export type MutationDeleteClientArgs = {
  clientId: string;
};

export type MutationDownloadInvoiceArgs = {
  projectId: string;
};

export type MutationProjectResponse = {
  success: boolean;
  message?: Maybe<string>;
  project: Project;
  client?: Maybe<Client>;
};

export type Project = {
  id: string;
  invoiceNumber: string;
  invoiceDate?: Maybe<Date>;
  name: string;
  projectDate?: Maybe<Date>;
  streetAddress?: Maybe<string>;
  city?: Maybe<string>;
  link?: Maybe<string>;
  status: Invoice_Status;
  user: string;
  expenses?: Maybe<Array<ExpenseAndIncome>>;
  incomes?: Maybe<Array<ExpenseAndIncome>>;
};

export type ProjectInput = {
  invoiceNumber: Maybe<string>;
  invoiceDate: Maybe<string>;
  projectDate: Maybe<string>;
  name: Maybe<string>;
  date: Maybe<string>;
  status: Maybe<Invoice_Status>;
  client: Maybe<ClientInput>;
  expenses: Maybe<Array<ExpenseAndIncomeInput>>;
  incomes: Maybe<Array<ExpenseAndIncomeInput>>;
};

export type Query = {
  getUser: User;
  getProjectsByUserId: Array<Project>;
  getSingleProject?: Maybe<Project>;
  getGeneralExpenses?: Maybe<Array<GeneralExpense>>;
  getClientsByUser?: Maybe<Array<Client>>;
  getClientByProject?: Maybe<Client>;
  getSingleClient?: Maybe<Client>;
  health?: Maybe<string>;
};

export type QueryGetProjectsByUserIdArgs = {
  userId: string;
};

export type QueryGetSingleProjectArgs = {
  projectId: string;
};

export type QueryGetClientByProjectArgs = {
  projectId: string;
};

export type QueryGetSingleClientArgs = {
  clientId: string;
};

export type RegisterResponse = {
  success: boolean;
  message?: Maybe<string>;
  token: string;
};

export type UpdateUserInput = {
  firstName: Maybe<string>;
  lastName: Maybe<string>;
  email: Maybe<string>;
  phone: Maybe<string>;
  password: Maybe<string>;
  btw: Maybe<string>;
  kvk: Maybe<string>;
  iban: Maybe<string>;
  streetAddress: Maybe<string>;
  postalCode: Maybe<string>;
  city: Maybe<string>;
};

export type UpdateUserResponse = {
  message?: Maybe<string>;
  user: User;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  projects?: Maybe<Array<Project>>;
  expenses?: Maybe<Array<GeneralExpense>>;
  clients?: Maybe<Array<Client>>;
  btw?: Maybe<string>;
  kvk?: Maybe<string>;
  iban?: Maybe<string>;
  phone?: Maybe<string>;
  streetAddress?: Maybe<string>;
  postalCode?: Maybe<string>;
  city?: Maybe<string>;
  createdAt?: Maybe<Date>;
  updatedAt?: Maybe<Date>;
};
export type GetProjectOverviewQueryVariables = {
  userId: string;
};

export type GetProjectOverviewQuery = { __typename?: "Query" } & {
  projects: Array<
    { __typename?: "Project" } & {
      incomes: Maybe<
        Array<{ __typename?: "ExpenseAndIncome" } & PriceFragmentFragment>
      >;
      expenses: Maybe<
        Array<{ __typename?: "ExpenseAndIncome" } & PriceFragmentFragment>
      >;
    } & BasicInfoFragmentFragment
  >;
};

export type GetSingleProjectQueryVariables = {
  id: string;
};

export type GetSingleProjectQuery = { __typename?: "Query" } & {
  project: Maybe<
    { __typename?: "Project" } & Pick<Project, "invoiceNumber"> & {
        incomes: Maybe<
          Array<
            { __typename?: "ExpenseAndIncome" } & Pick<
              ExpenseAndIncome,
              "name"
            > &
              PriceFragmentFragment
          >
        >;
        expenses: Maybe<
          Array<
            { __typename?: "ExpenseAndIncome" } & Pick<
              ExpenseAndIncome,
              "name"
            > &
              PriceFragmentFragment
          >
        >;
      } & BasicInfoFragmentFragment
  >;
  client: Maybe<
    { __typename?: "Client" } & Pick<
      Client,
      "streetAddress" | "postalCode" | "city"
    > &
      ClientFragmentFragment
  >;
};

export type UpdateStatusMutationVariables = {
  projectId: string;
  data: ProjectInput;
};

export type UpdateStatusMutation = { __typename?: "Mutation" } & {
  updateProject: { __typename?: "MutationProjectResponse" } & Pick<
    MutationProjectResponse,
    "success" | "message"
  > & { project: { __typename?: "Project" } & Pick<Project, "id" | "status"> };
};

export type AddProjectMutationVariables = {
  data: ProjectInput;
};

export type AddProjectMutation = { __typename?: "Mutation" } & {
  addProject: Maybe<
    { __typename?: "MutationProjectResponse" } & Pick<
      MutationProjectResponse,
      "success" | "message"
    > & {
        project: { __typename?: "Project" } & Pick<Project, "invoiceNumber"> & {
            incomes: Maybe<
              Array<
                { __typename?: "ExpenseAndIncome" } & Pick<
                  ExpenseAndIncome,
                  "name"
                > &
                  PriceFragmentFragment
              >
            >;
            expenses: Maybe<
              Array<
                { __typename?: "ExpenseAndIncome" } & Pick<
                  ExpenseAndIncome,
                  "name"
                > &
                  PriceFragmentFragment
              >
            >;
          } & BasicInfoFragmentFragment;
        client: Maybe<{ __typename?: "Client" } & ClientFragmentFragment>;
      }
  >;
};

export type UpdateIncomesAndExpensesMutationVariables = {
  projectId: string;
  data: ProjectInput;
};

export type UpdateIncomesAndExpensesMutation = { __typename?: "Mutation" } & {
  updateProject: { __typename?: "MutationProjectResponse" } & Pick<
    MutationProjectResponse,
    "success" | "message"
  > & {
      project: { __typename?: "Project" } & Pick<Project, "id"> & {
          incomes: Maybe<
            Array<
              { __typename?: "ExpenseAndIncome" } & Pick<
                ExpenseAndIncome,
                "name"
              > &
                PriceFragmentFragment
            >
          >;
          expenses: Maybe<
            Array<
              { __typename?: "ExpenseAndIncome" } & Pick<
                ExpenseAndIncome,
                "name"
              > &
                PriceFragmentFragment
            >
          >;
        };
    };
};

export type UpdateBasicInfoMutationVariables = {
  projectId: string;
  data: ProjectInput;
};

export type UpdateBasicInfoMutation = { __typename?: "Mutation" } & {
  updateProject: { __typename?: "MutationProjectResponse" } & Pick<
    MutationProjectResponse,
    "success" | "message"
  > & {
      project: { __typename?: "Project" } & Pick<Project, "invoiceNumber"> &
        BasicInfoFragmentFragment;
    };
};

export type DeleteProjectMutationVariables = {
  projectId: string;
};

export type DeleteProjectMutation = { __typename?: "Mutation" } & {
  deleteProject: Maybe<
    { __typename?: "MutationProjectResponse" } & Pick<
      MutationProjectResponse,
      "message"
    > & { project: { __typename?: "Project" } & Pick<Project, "id"> }
  >;
};

export type DownloadInvoiceMutationVariables = {
  projectId: string;
};

export type DownloadInvoiceMutation = { __typename?: "Mutation" } & {
  downloadInvoice: Maybe<
    { __typename?: "GenerateInvoiceResponse" } & Pick<
      GenerateInvoiceResponse,
      "message"
    > & { data: Maybe<> }
  >;
};

export type ClientFragmentFragment = { __typename?: "Client" } & Pick<
  Client,
  "id" | "firstName" | "lastName" | "email" | "phone"
>;

export type PriceFragmentFragment = { __typename?: "ExpenseAndIncome" } & Pick<
  ExpenseAndIncome,
  "price" | "quantity" | "taxRate"
>;

export type BasicInfoFragmentFragment = { __typename?: "Project" } & Pick<
  Project,
  "id" | "name" | "status"
> & { projectDate: Maybe<>; invoiceDate: Maybe<> };
import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Fragments
// ====================================================

export namespace ClientFragment {
  export const FragmentDoc = gql`
    fragment ClientFragment on Client {
      id
      firstName
      lastName
      email
      phone
    }
  `;
}

export namespace PriceFragment {
  export const FragmentDoc = gql`
    fragment PriceFragment on ExpenseAndIncome {
      price
      quantity
      taxRate
    }
  `;
}

export namespace BasicInfoFragment {
  export const FragmentDoc = gql`
    fragment BasicInfoFragment on Project {
      id
      name
      projectDate
      invoiceDate
      status
    }
  `;
}

// ====================================================
// Components
// ====================================================

export namespace GetProjectOverview {
  export const Document = gql`
    query getProjectOverview($userId: String!) {
      projects: getProjectsByUserId(userId: $userId) {
        ...BasicInfoFragment
        incomes {
          ...PriceFragment
        }
        expenses {
          ...PriceFragment
        }
      }
    }

    ${BasicInfoFragment.FragmentDoc}
    ${PriceFragment.FragmentDoc}
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.DataProps<Query, Variables>
  > &
    TChildProps;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Query,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Query, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace GetSingleProject {
  export const Document = gql`
    query getSingleProject($id: String!) {
      project: getSingleProject(projectId: $id) {
        invoiceNumber
        ...BasicInfoFragment
        incomes {
          name
          ...PriceFragment
        }
        expenses {
          name
          ...PriceFragment
        }
      }
      client: getClientByProject(projectId: $id) {
        ...ClientFragment
        streetAddress
        postalCode
        city
      }
    }

    ${BasicInfoFragment.FragmentDoc}
    ${PriceFragment.FragmentDoc}
    ${ClientFragment.FragmentDoc}
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.DataProps<Query, Variables>
  > &
    TChildProps;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Query,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Query, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace UpdateStatus {
  export const Document = gql`
    mutation updateStatus($projectId: String!, $data: ProjectInput!) {
      updateProject(projectId: $projectId, data: $data) {
        success
        message
        project {
          id
          status
        }
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace AddProject {
  export const Document = gql`
    mutation addProject($data: ProjectInput!) {
      addProject(data: $data) {
        success
        message
        project {
          invoiceNumber
          ...BasicInfoFragment
          incomes {
            name
            ...PriceFragment
          }
          expenses {
            name
            ...PriceFragment
          }
        }
        client {
          ...ClientFragment
        }
      }
    }

    ${BasicInfoFragment.FragmentDoc}
    ${PriceFragment.FragmentDoc}
    ${ClientFragment.FragmentDoc}
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace UpdateIncomesAndExpenses {
  export const Document = gql`
    mutation updateIncomesAndExpenses(
      $projectId: String!
      $data: ProjectInput!
    ) {
      updateProject(projectId: $projectId, data: $data) {
        success
        message
        project {
          id
          incomes {
            name
            ...PriceFragment
          }
          expenses {
            name
            ...PriceFragment
          }
        }
      }
    }

    ${PriceFragment.FragmentDoc}
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace UpdateBasicInfo {
  export const Document = gql`
    mutation updateBasicInfo($projectId: String!, $data: ProjectInput!) {
      updateProject(projectId: $projectId, data: $data) {
        success
        message
        project {
          invoiceNumber
          ...BasicInfoFragment
        }
      }
    }

    ${BasicInfoFragment.FragmentDoc}
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace DeleteProject {
  export const Document = gql`
    mutation deleteProject($projectId: String!) {
      deleteProject(projectId: $projectId) {
        message
        project {
          id
        }
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace DownloadInvoice {
  export const Document = gql`
    mutation downloadInvoice($projectId: String!) {
      downloadInvoice(projectId: $projectId) {
        message
        data
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
