export interface UpdateUserInput {
  firstName?: string | null;

  lastName?: string | null;

  email?: string | null;

  phone?: string | null;

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
  id?: string | null;

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

    projects: Projects[];
  };

  export type Projects = {
    __typename?: "Project";

    incomes: Incomes[] | null;
  } & BasicInfoFragment.Fragment;

  export type Incomes = PriceFragment.Fragment;
}

export namespace GetSingleProject {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    project: Project | null;

    client: Client | null;
  };

  export type Project = {
    __typename?: "Project";

    invoiceNumber: string;

    incomes: Incomes[] | null;

    expenses: Expenses[] | null;
  } & BasicInfoFragment.Fragment;

  export type Incomes = {
    __typename?: "ExpenseAndIncome";

    name: string | null;
  } & PriceFragment.Fragment;

  export type Expenses = {
    __typename?: "ExpenseAndIncome";

    name: string | null;
  } & PriceFragment.Fragment;

  export type Client = {
    __typename?: "Client";

    streetAddress: string | null;

    postalCode: string | null;

    city: string | null;
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

    message: string | null;

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

    addProject: AddProject | null;
  };

  export type AddProject = {
    __typename?: "MutationProjectResponse";

    success: boolean;

    message: string | null;

    project: Project;
  };

  export type Project = {
    __typename?: "Project";

    invoiceNumber: string;

    incomes: Incomes[] | null;

    expenses: Expenses[] | null;
  } & BasicInfoFragment.Fragment;

  export type Incomes = {
    __typename?: "ExpenseAndIncome";

    name: string | null;
  } & PriceFragment.Fragment;

  export type Expenses = {
    __typename?: "ExpenseAndIncome";

    name: string | null;
  } & PriceFragment.Fragment;
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

    project: Project;
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
  } & PriceFragment.Fragment;

  export type Expenses = {
    __typename?: "ExpenseAndIncome";

    name: string | null;
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

    message: string | null;

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

    deleteProject: DeleteProject | null;
  };

  export type DeleteProject = {
    __typename?: "MutationProjectResponse";

    message: string | null;

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

    downloadInvoice: DownloadInvoice | null;
  };

  export type DownloadInvoice = {
    __typename?: "GenerateInvoiceResponse";

    message: string | null;

    data: Blob | null;
  };
}

export namespace ClientFragment {
  export type Fragment = {
    __typename?: "Client";

    id: string;

    firstName: string | null;

    lastName: string | null;

    email: string | null;

    phone: string | null;
  };
}

export namespace PriceFragment {
  export type Fragment = {
    __typename?: "ExpenseAndIncome";

    price: string | null;

    quantity: number | null;

    taxRate: number | null;
  };
}

export namespace BasicInfoFragment {
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
      }
    }

    ${BasicInfoFragment.FragmentDoc}
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
