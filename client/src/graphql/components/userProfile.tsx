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

export namespace UpdateUser {
  export type Variables = {
    data: UpdateUserInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updateUser: UpdateUser;
  };

  export type UpdateUser = {
    __typename?: "updateUserResponse";

    message: string | null;

    user: User;
  };

  export type User = UserFragments.Fragment;
}

export namespace GetUserProfile {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    getUser: GetUser;
  };

  export type GetUser = UserFragments.Fragment;
}

export namespace UserFragments {
  export type Fragment = {
    __typename?: "User";

    id: string;

    firstName: string;

    lastName: string;

    clients: Clients[] | null;

    phone: string | null;

    btw: string | null;

    kvk: string | null;

    iban: string | null;

    streetAddress: string | null;

    postalCode: string | null;

    city: string | null;
  };

  export type Clients = {
    __typename?: "Client";

    id: string;

    firstName: string | null;

    lastName: string | null;

    email: string | null;

    phone: string | null;

    streetAddress: string | null;

    postalCode: string | null;

    city: string | null;
  };
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Fragments
// ====================================================

export namespace UserFragments {
  export const FragmentDoc = gql`
    fragment UserFragments on User {
      id
      firstName
      lastName
      clients {
        id
        firstName
        lastName
        email
        phone
        streetAddress
        postalCode
        city
      }
      phone
      btw
      kvk
      iban
      streetAddress
      postalCode
      city
    }
  `;
}

// ====================================================
// Components
// ====================================================

export namespace UpdateUser {
  export const Document = gql`
    mutation updateUser($data: UpdateUserInput!) {
      updateUser(data: $data) {
        message
        user {
          ...UserFragments
        }
      }
    }

    ${UserFragments.FragmentDoc}
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
export namespace GetUserProfile {
  export const Document = gql`
    query getUserProfile($id: String!) {
      getUser(id: $id) {
        ...UserFragments
      }
    }

    ${UserFragments.FragmentDoc}
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
