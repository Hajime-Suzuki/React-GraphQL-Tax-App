export type Maybe<T> = T | null | undefined;

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

export namespace GetClientsList {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    getClientsByUser: Maybe<GetClientsByUser[]>;
  };

  export type GetClientsByUser = ClientFragment.Fragment;
}

export namespace SingleClient {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    getSingleClient: Maybe<GetSingleClient>;
  };

  export type GetSingleClient = {
    __typename?: "Client";

    streetAddress: Maybe<string>;

    postalCode: Maybe<string>;

    city: Maybe<string>;
  } & ClientFragment.Fragment;
}

export namespace AddClient {
  export type Variables = {
    data: ClientInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    addClient: Maybe<AddClient>;
  };

  export type AddClient = {
    __typename?: "ClientMutationResponse";

    client: Maybe<Client>;
  };

  export type Client = ClientFragment.Fragment;
}

export namespace UpdateClient {
  export type Variables = {
    clientId: string;
    data: ClientInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updateClient: Maybe<UpdateClient>;
  };

  export type UpdateClient = {
    __typename?: "ClientMutationResponse";

    message: Maybe<string>;

    client: Maybe<Client>;
  };

  export type Client = {
    __typename?: "Client";

    streetAddress: Maybe<string>;

    postalCode: Maybe<string>;

    city: Maybe<string>;
  } & ClientFragment.Fragment;
}

export namespace UpdateClientProject {
  export type Variables = {
    clientId: string;
    projectId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updateClientProject: Maybe<UpdateClientProject>;
  };

  export type UpdateClientProject = {
    __typename?: "ClientMutationResponse";

    client: Maybe<Client>;
  };

  export type Client = {
    __typename?: "Client";

    streetAddress: Maybe<string>;

    postalCode: Maybe<string>;

    city: Maybe<string>;
  } & ClientFragment.Fragment;
}

export namespace DeleteClient {
  export type Variables = {
    clientId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    deleteClient: Maybe<DeleteClient>;
  };

  export type DeleteClient = {
    __typename?: "ClientMutationResponse";

    client: Maybe<Client>;
  };

  export type Client = {
    __typename?: "Client";

    id: string;
  };
}

export namespace RemoveClientFromProject {
  export type Variables = {
    clientId: string;
    projectId: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    removeClientFromProject: Maybe<RemoveClientFromProject>;
  };

  export type RemoveClientFromProject = {
    __typename?: "ClientMutationResponse";

    client: Maybe<Client>;
  };

  export type Client = ClientFragment.Fragment;
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

export namespace GetClientsList {
  export const Document = gql`
    query getClientsList {
      getClientsByUser {
        ...ClientFragment
      }
    }

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
export namespace SingleClient {
  export const Document = gql`
    query singleClient($id: String!) {
      getSingleClient(clientId: $id) {
        ...ClientFragment
        streetAddress
        postalCode
        city
      }
    }

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
export namespace AddClient {
  export const Document = gql`
    mutation addClient($data: ClientInput!) {
      addClient(data: $data) {
        client {
          ...ClientFragment
        }
      }
    }

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
export namespace UpdateClient {
  export const Document = gql`
    mutation updateClient($clientId: String!, $data: ClientInput!) {
      updateClient(clientId: $clientId, data: $data) {
        message
        client {
          ...ClientFragment
          streetAddress
          postalCode
          city
        }
      }
    }

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
export namespace UpdateClientProject {
  export const Document = gql`
    mutation updateClientProject($clientId: String!, $projectId: String!) {
      updateClientProject(clientId: $clientId, projectId: $projectId) {
        client {
          ...ClientFragment
          streetAddress
          postalCode
          city
        }
      }
    }

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
export namespace DeleteClient {
  export const Document = gql`
    mutation deleteClient($clientId: String!) {
      deleteClient(clientId: $clientId) {
        client {
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
export namespace RemoveClientFromProject {
  export const Document = gql`
    mutation removeClientFromProject($clientId: String!, $projectId: String!) {
      removeClientFromProject(clientId: $clientId, projectId: $projectId) {
        client {
          ...ClientFragment
        }
      }
    }

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
