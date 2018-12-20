export interface UpdateProjectInput {
  status: InvoiceStatus;
}

export interface AddProjectInput {
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

  price?: number | null;

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

    id: string;

    name: string;

    date: Date | null;

    invoiceDate: string | null;

    incomes: Incomes[] | null;

    status: InvoiceStatus;
  };

  export type Incomes = {
    __typename?: "ExpenseAndIncome";

    price: number;

    quantity: number;
  };
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

    id: string;

    invoiceNumber: string;

    invoiceDate: string | null;

    name: string;

    date: Date | null;

    streetAddress: string | null;

    city: string | null;

    status: InvoiceStatus;

    client: Client | null;

    incomes: Incomes[] | null;
  };

  export type Client = {
    __typename?: "Client";

    firstName: string | null;

    lastName: string | null;

    email: string | null;

    phone: string | null;
  };

  export type Incomes = {
    __typename?: "ExpenseAndIncome";

    name: string;

    price: number;

    quantity: number;

    taxRate: number;
  };
}

export namespace UpdateStatus {
  export type Variables = {
    projectId: string;
    data: UpdateProjectInput;
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
    data: AddProjectInput;
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

    id: string;

    status: InvoiceStatus;
  };
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export namespace GetProjectOverview {
  export const Document = gql`
    query getProjectOverview($userId: String!) {
      getProjectsByUserId(userId: $userId) {
        id
        name
        date
        invoiceDate
        incomes {
          price
          quantity
        }
        status
      }
    }
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
        id
        invoiceNumber
        invoiceDate
        name
        date
        streetAddress
        city
        status
        client {
          firstName
          lastName
          email
          phone
        }
        incomes {
          name
          price
          quantity
          taxRate
        }
      }
    }
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
    mutation updateStatus($projectId: String!, $data: UpdateProjectInput!) {
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
    mutation addProject($data: AddProjectInput!) {
      addProject(data: $data) {
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
