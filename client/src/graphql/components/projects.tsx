export interface UpdateUserInput {
  firstName?: string | null;

  lastName?: string | null;

  email?: string | null;

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
// Documents
// ====================================================

export namespace GetProjectOverview {
  export type Variables = {
    userId: string;
  };

  export type Query = {
    __typename?: "Query";

    getProjectsByUserId: GetProjectsByUserId[];
  };

  export type GetProjectsByUserId = {
    __typename?: "Project";

    incomes: Incomes[] | null;
  } & BasicInfoFragments.Fragment;

  export type Incomes = PriceFragments.Fragment;
}

export namespace GetSingleProject {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    getSingleProject: GetSingleProject | null;
  };

  export type GetSingleProject = {
    __typename?: "Project";

    invoiceNumber: string;

    client: Client | null;

    incomes: Incomes[] | null;

    expenses: Expenses[] | null;
  } & BasicInfoFragments.Fragment;

  export type Client = {
    __typename?: "Client";

    firstName: string | null;

    lastName: string | null;

    email: string | null;

    phone: string | null;
  };

  export type Incomes = {
    __typename?: "ExpenseAndIncome";

    name: string | null;
  } & PriceFragments.Fragment;

  export type Expenses = {
    __typename?: "ExpenseAndIncome";

    name: string | null;
  } & PriceFragments.Fragment;
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

    message: string | null;

    project: Project | null;
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

    addProject: AddProject | null;
  };

  export type AddProject = {
    __typename?: "MutationProjectResponse";

    success: boolean;

    message: string | null;

    project: Project | null;
  };

  export type Project = {
    __typename?: "Project";

    invoiceNumber: string;

    client: Client | null;

    incomes: Incomes[] | null;

    expenses: Expenses[] | null;
  } & BasicInfoFragments.Fragment;

  export type Client = {
    __typename?: "Client";

    firstName: string | null;

    lastName: string | null;

    email: string | null;

    phone: string | null;
  };

  export type Incomes = {
    __typename?: "ExpenseAndIncome";

    name: string | null;
  } & PriceFragments.Fragment;

  export type Expenses = {
    __typename?: "ExpenseAndIncome";

    name: string | null;
  } & PriceFragments.Fragment;
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

    message: string | null;

    project: Project | null;
  };

  export type Project = {
    __typename?: "Project";

    id: string;

    incomes: Incomes[] | null;

    expenses: Expenses[] | null;
  };

  export type Incomes = {
    __typename?: "ExpenseAndIncome";

    name: string | null;
  } & PriceFragments.Fragment;

  export type Expenses = {
    __typename?: "ExpenseAndIncome";

    name: string | null;
  } & PriceFragments.Fragment;
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

    message: string | null;

    project: Project | null;
  };

  export type Project = {
    __typename?: "Project";

    invoiceNumber: string;

    client: Client | null;
  } & BasicInfoFragments.Fragment;

  export type Client = {
    __typename?: "Client";

    firstName: string | null;

    lastName: string | null;

    email: string | null;

    phone: string | null;
  };
}

export namespace DeleteProject {
  export type Variables = {
    projectId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    deleteProject: DeleteProject | null;
  };

  export type DeleteProject = {
    __typename?: "MutationProjectResponse";

    message: string | null;

    project: Project | null;
  };

  export type Project = {
    __typename?: "Project";

    invoiceNumber: string;

    client: Client | null;
  } & BasicInfoFragments.Fragment;

  export type Client = {
    __typename?: "Client";

    firstName: string | null;

    lastName: string | null;

    email: string | null;

    phone: string | null;
  };
}

export namespace DownloadInvoice {
  export type Variables = {
    projectId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    downloadInvoice: DownloadInvoice | null;
  };

  export type DownloadInvoice = {
    __typename?: "GenerateInvoiceResponse";

    message: string | null;

    data: Blob | null;
  };
}

export namespace PriceFragments {
  export type Fragment = {
    __typename?: "ExpenseAndIncome";

    price: string | null;

    quantity: number | null;

    taxRate: number | null;
  };
}

export namespace BasicInfoFragments {
  export type Fragment = {
    __typename?: "Project";

    id: string;

    name: string;

    projectDate: Date | null;

    invoiceDate: Date | null;

    status: InvoiceStatus;
  };
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Fragments
// ====================================================

export namespace PriceFragments {
  export const FragmentDoc = gql`
    fragment PriceFragments on ExpenseAndIncome {
      price
      quantity
      taxRate
    }
  `;
}

export namespace BasicInfoFragments {
  export const FragmentDoc = gql`
    fragment BasicInfoFragments on Project {
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
      getProjectsByUserId(userId: $userId) {
        ...BasicInfoFragments
        incomes {
          ...PriceFragments
        }
      }
    }

    ${BasicInfoFragments.FragmentDoc}
    ${PriceFragments.FragmentDoc}
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
      getSingleProject(projectId: $id) {
        invoiceNumber
        ...BasicInfoFragments
        client {
          firstName
          lastName
          email
          phone
        }
        incomes {
          name
          ...PriceFragments
        }
        expenses {
          name
          ...PriceFragments
        }
      }
    }

    ${BasicInfoFragments.FragmentDoc}
    ${PriceFragments.FragmentDoc}
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
          ...BasicInfoFragments
          client {
            firstName
            lastName
            email
            phone
          }
          incomes {
            name
            ...PriceFragments
          }
          expenses {
            name
            ...PriceFragments
          }
        }
      }
    }

    ${BasicInfoFragments.FragmentDoc}
    ${PriceFragments.FragmentDoc}
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
            ...PriceFragments
          }
          expenses {
            name
            ...PriceFragments
          }
        }
      }
    }

    ${PriceFragments.FragmentDoc}
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
          ...BasicInfoFragments
          client {
            firstName
            lastName
            email
            phone
          }
        }
      }
    }

    ${BasicInfoFragments.FragmentDoc}
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
          invoiceNumber
          ...BasicInfoFragments
          client {
            firstName
            lastName
            email
            phone
          }
        }
      }
    }

    ${BasicInfoFragments.FragmentDoc}
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
